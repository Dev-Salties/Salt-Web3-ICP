/// Articles module — CRUD, publish/draft, scheduled publishing.
import Array   "mo:base/Array";
import Buffer  "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter    "mo:base/Iter";
import Order   "mo:base/Order";
import Text    "mo:base/Text";
import Time    "mo:base/Time";
import Nat     "mo:base/Nat";
import T       "../types/Types";

module {

  public type StableState = [(Text, T.Article)];

  public class Store() {

    var articles = HashMap.HashMap<Text, T.Article>(
      8, Text.equal, Text.hash,
    );

    // ── Upgrade persistence ──────────────────────────────────────────────

    public func toStable() : StableState {
      Iter.toArray(articles.entries())
    };

    public func fromStable(s : StableState) {
      // HashMap initial capacity expects Nat, not Nat32
      articles := HashMap.HashMap<Text, T.Article>(
        s.size() + 1,
        Text.equal,
        Text.hash
      );
      for ((k, v) in s.vals()) { articles.put(k, v) };
    };
      
    // ── Helpers ──────────────────────────────────────────────────────────

    func byDateDesc(xs : [T.Article]) : [T.Article] {
      Array.sort<T.Article>(
        xs,
        func (a : T.Article, b : T.Article) : Order.Order {
          // newest first
          Text.compare(b.date, a.date)
        }
      )
    };

    func toIndex(a : T.Article) : T.ArticleIndex = {
      id          = a.id;
      slug        = a.slug;
      title       = a.title;
      description = a.description;
      imageUrl    = a.imageUrl;
      tags        = a.tags;
      date        = a.date;
      status      = a.status;
    };

    // ── Public queries (anonymous) ────────────────────────────────────────

    public func getPublishedIndex() : [T.ArticleIndex] {
      // Store Articles directly to avoid Option unwrap (!)
      let buf = Buffer.Buffer<T.Article>(articles.size());

      for ((_, a) in articles.entries()) {
        switch (a.status) {
          case (#published) { buf.add(a) };
          case (_) {};
        };
      };

      let sorted = byDateDesc(Buffer.toArray(buf));
      Array.map<T.Article, T.ArticleIndex>(sorted, toIndex)
    };

    public func getArticle(id : Text) : ?T.Article {
      switch (articles.get(id)) {
        case (?(a)) {
          switch (a.status) { case (#published) ?(a); case _ null };
        };
        case null null;
      };
    };

    public func getArticleBySlug(slug : Text) : ?T.Article {
      for ((_, a) in articles.entries()) {
        if (a.slug == slug) {
          switch (a.status) { case (#published) return ?(a); case _ return null };
        };
      };
      null
    };

    public func getArticlesByTag(tag : Text) : [T.ArticleIndex] {
      let all = getPublishedIndex();
      Array.filter(all, func(a : T.ArticleIndex) : Bool {
        Array.find<Text>(a.tags, func(t) { t == tag }) != null
      })
    };

    // ── Admin queries ─────────────────────────────────────────────────────

    public func getAllArticles() : [T.Article] {
      byDateDesc(Iter.toArray(articles.vals()))
    };

    // ── Mutations ─────────────────────────────────────────────────────────

    public func createArticle(a : T.Article) : T.CmsResult {
      switch (articles.get(a.id)) {
        case (?(existing)) {
          // Allow upsert by ID but reject duplicate slug
          if (existing.slug != a.slug) return #err("Slug conflict");
          #err("Duplicate id — use updateArticle")
        };
        case null {
          articles.put(a.id, a);
          #ok()
        };
      };
    };

    public func updateArticle(a : T.Article) : T.CmsResult {
      switch (articles.get(a.id)) {
        case null { #err("Article not found") };
        case (?(existing)) {
          articles.put(a.id, { a with updatedAt = Time.now() });
          #ok()
        };
      };
    };

    public func publishArticle(id : Text) : T.CmsResult {
      switch (articles.get(id)) {
        case null { #err("Article not found") };
        case (?(a)) {
          articles.put(id, { a with status = #published; updatedAt = Time.now() });
          #ok()
        };
      };
    };

    public func unpublishArticle(id : Text) : T.CmsResult {
      switch (articles.get(id)) {
        case null { #err("Article not found") };
        case (?(a)) {
          articles.put(id, { a with status = #draft; updatedAt = Time.now() });
          #ok()
        };
      };
    };

    public func deleteArticle(id : Text) : T.CmsResult {
      switch (articles.get(id)) {
        case null { #err("Article not found") };
        case (?(a)) { ignore articles.remove(id); #ok() };
      };
    };

    /// Called from the canister heartbeat — auto-publishes scheduled articles
    /// whose scheduledAt timestamp has been reached.
    public func processScheduled(now : Int) {
      for ((id, a) in articles.entries()) {
        switch (a.status, a.scheduledAt) {
          case (#scheduled, ?(t)) {
            if (now >= t) {
              articles.put(id, { a with status = #published; updatedAt = now });
            };
          };
          case _ {};
        };
      };
    };

    public func size() : Nat { articles.size() };
  };
}
