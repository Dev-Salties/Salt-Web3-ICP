/// Vacancies module — job listings CRUD.
import Array   "mo:base/Array";
import Buffer  "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter    "mo:base/Iter";
import Text    "mo:base/Text";
import Time    "mo:base/Time";
import T       "../types/Types";

module {

  public type StableState = [(Text, T.Vacancy)];

  public class Store() {

    var vacancies = HashMap.HashMap<Text, T.Vacancy>(
      4, Text.equal, Text.hash,
    );

    public func toStable() : StableState { Iter.toArray(vacancies.entries()) };

    public func fromStable(s : StableState) {
      vacancies := HashMap.HashMap<Text, T.Vacancy>(
        s.size() + 1, Text.equal, Text.hash,
      );
      for ((k, v) in s.vals()) { vacancies.put(k, v) };
    };

    // ── Public queries ────────────────────────────────────────────────────

    public func getActiveVacancies() : [T.Vacancy] {
      let buf = Buffer.Buffer<T.Vacancy>(vacancies.size());
      for ((_, v) in vacancies.entries()) { if (v.active) buf.add(v) };
      Buffer.toArray(buf)
    };

    // ── Admin queries ─────────────────────────────────────────────────────

    public func getAllVacancies() : [T.Vacancy] { Iter.toArray(vacancies.vals()) };

    // ── Mutations ─────────────────────────────────────────────────────────

    public func createVacancy(v : T.Vacancy) : T.CmsResult {
      switch (vacancies.get(v.id)) {
        case (?(existing)) { #err("Duplicate id") };
        case null { vacancies.put(v.id, v); #ok() };
      };
    };

    public func updateVacancy(v : T.Vacancy) : T.CmsResult {
      switch (vacancies.get(v.id)) {
        case null { #err("Vacancy not found") };
        case (?(existing)) {
          vacancies.put(v.id, { v with updatedAt = Time.now() });
          #ok()
        };
      };
    };

    public func deleteVacancy(id : Text) : T.CmsResult {
      switch (vacancies.get(id)) {
        case null { #err("Vacancy not found") };
        case (?(v)) { ignore vacancies.remove(id); #ok() };
      };
    };

    public func size() : Nat { vacancies.size() };
  };
}
