/// Products module — CRUD with category filtering.
import Array   "mo:base/Array";
import Buffer  "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter    "mo:base/Iter";
import Text    "mo:base/Text";
import Time    "mo:base/Time";
import T       "../types/Types";

module {

  public type StableState = [(Text, T.Product)];

  public class Store() {

    var products = HashMap.HashMap<Text, T.Product>(
      8, Text.equal, Text.hash,
    );

    public func toStable() : StableState { Iter.toArray(products.entries()) };

    public func fromStable(s : StableState) {
      products := HashMap.HashMap<Text, T.Product>(
        s.size() + 1, Text.equal, Text.hash,
      );
      for ((k, v) in s.vals()) { products.put(k, v) };
    };

    // ── Public queries ────────────────────────────────────────────────────

    public func getActiveProducts() : [T.Product] {
      let buf = Buffer.Buffer<T.Product>(products.size());
      for ((_, p) in products.entries()) { if (p.active) buf.add(p) };
      Buffer.toArray(buf)
    };

    public func getProductsByCategory(cat : Text) : [T.Product] {
      Array.filter(getActiveProducts(), func(p : T.Product) : Bool { p.category == cat })
    };

    // ── Admin queries ─────────────────────────────────────────────────────

    public func getAllProducts() : [T.Product] { Iter.toArray(products.vals()) };

    // ── Mutations ─────────────────────────────────────────────────────────

    public func createProduct(p : T.Product) : T.CmsResult {
      switch (products.get(p.id)) {
        case (?(existing)) { #err("Duplicate id") };
        case null { products.put(p.id, p); #ok() };
      };
    };

    public func updateProduct(p : T.Product) : T.CmsResult {
      switch (products.get(p.id)) {
        case null { #err("Product not found") };
        case (?(existing)) {
          products.put(p.id, { p with updatedAt = Time.now() });
          #ok()
        };
      };
    };

    public func deleteProduct(id : Text) : T.CmsResult {
      switch (products.get(id)) {
        case null { #err("Product not found") };
        case (?(p)) { ignore products.remove(id); #ok() };
      };
    };

    public func size() : Nat { products.size() };
  };
}
