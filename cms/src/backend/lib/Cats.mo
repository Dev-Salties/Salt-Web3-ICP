/// CAT Sessions module — archive-based storage strategy.
///
/// Sessions are NEVER hard-deleted by default. Old years are archived
/// (archived = true), which keeps the full on-chain history but hides them
/// from the public query. This avoids the data-loss risk of permanent
/// deletion while solving the storage-growth concern: archived entries stop
/// being returned to the website but remain auditable through the admin panel.
///
/// Storage growth estimate: a CatSession record is ~500 bytes. At 8 sessions
/// per year, 10 years of data ≈ 40 KB — negligible vs ICP's GBs of stable
/// memory. No pagination needed at this scale.
import Array   "mo:base/Array";
import Order "mo:base/Order";
import Buffer  "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter    "mo:base/Iter";
import Nat     "mo:base/Nat";
import Text    "mo:base/Text";
import T       "../types/Types";

module {

  public type StableState = [(Text, T.CatSession)];

  public class Store() {

    var sessions = HashMap.HashMap<Text, T.CatSession>(
      16, Text.equal, Text.hash,
    );

    public func toStable() : StableState { Iter.toArray(sessions.entries()) };

    public func fromStable(s : StableState) {
      sessions := HashMap.HashMap<Text, T.CatSession>(
        s.size() + 1,
        Text.equal,
        Text.hash
      );
      for ((k, v) in s.vals()) { sessions.put(k, v) };
    };

    // ── Sorting ──────────────────────────────────────────────────────────

    func sorted(xs : [T.CatSession]) : [T.CatSession] {
      Array.sort<T.CatSession>(
        xs,
        func (a : T.CatSession, b : T.CatSession) : Order.Order {
          let yr : Order.Order = Text.compare(b.year, a.year); // newest year first
          if (yr != #equal) {
            yr
          } else {
            Nat.compare(a.order, b.order)
          }
        }
      )
    };

    // ── Public queries ────────────────────────────────────────────────────

    /// Returns only non-archived sessions, newest year first.
    public func getActiveSessions() : [T.CatSession] {
      let buf = Buffer.Buffer<T.CatSession>(sessions.size());
      for ((_, s) in sessions.entries()) { if (not s.archived) buf.add(s) };
      sorted(Buffer.toArray(buf))
    };

    /// Returns sessions for a specific year (non-archived).
    public func getSessionsByYear(year : Text) : [T.CatSession] {
      Array.filter(getActiveSessions(), func(s : T.CatSession) : Bool { s.year == year })
    };

    // ── Admin queries ─────────────────────────────────────────────────────

    public func getAllSessions() : [T.CatSession] {
      sorted(Iter.toArray(sessions.vals()))
    };

    // ── Mutations ─────────────────────────────────────────────────────────

    /// Upsert by (year, week) — re-submitting the same year+week updates the URL.
    public func upsertSession(s : T.CatSession) : T.CmsResult {
      sessions.put(s.id, s);
      #ok()
    };

    public func createSession(s : T.CatSession) : T.CmsResult {
      switch (sessions.get(s.id)) {
        case (?(existing)) { #err("Duplicate id — use updateSession or upsertSession") };
        case null { sessions.put(s.id, s); #ok() };
      };
    };

    public func updateSession(s : T.CatSession) : T.CmsResult {
      switch (sessions.get(s.id)) {
        case null { #err("Session not found") };
        case (?(existing)) { sessions.put(s.id, s); #ok() };
      };
    };

    /// Soft-delete: hides from public listing while preserving history.
    public func archiveSession(id : Text) : T.CmsResult {
      switch (sessions.get(id)) {
        case null { #err("Session not found") };
        case (?(s)) { sessions.put(id, { s with archived = true }); #ok() };
      };
    };

    public func unarchiveSession(id : Text) : T.CmsResult {
      switch (sessions.get(id)) {
        case null { #err("Session not found") };
        case (?(s)) { sessions.put(id, { s with archived = false }); #ok() };
      };
    };

    /// Hard delete — prefer archiveSession to preserve history.
    public func deleteSession(id : Text) : T.CmsResult {
      switch (sessions.get(id)) {
        case null { #err("Session not found") };
        case (?(s)) { ignore sessions.remove(id); #ok() };
      };
    };

    public func size() : Nat { sessions.size() };
  };
}
