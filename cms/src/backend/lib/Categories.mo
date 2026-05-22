/// Product categories module.
import Array   "mo:base/Array";
import Order "mo:base/Order";
import HashMap "mo:base/HashMap";
import Iter    "mo:base/Iter";
import Nat     "mo:base/Nat";
import Text    "mo:base/Text";
import T       "../types/Types";

module {

  public type StableState = [(Text, T.Category)];

  public class Store() {

    var cats = HashMap.HashMap<Text, T.Category>(4, Text.equal, Text.hash);

    public func toStable() : StableState { Iter.toArray(cats.entries()) };

    public func fromStable(s : StableState) {
      cats := HashMap.HashMap<Text, T.Category>(
        s.size() + 1,
        Text.equal,
        Text.hash
      );
      for ((k, v) in s.vals()) { cats.put(k, v) };
    };

    public func getCategories() : [T.Category] {
      Array.sort<T.Category>(
        Iter.toArray(cats.vals()),
        func (a : T.Category, b : T.Category) : Order.Order {
          Nat.compare(a.order, b.order)
        }
      )
    };

    public func createCategory(c : T.Category) : T.CmsResult {
      switch (cats.get(c.id)) {
        case (?(existing)) { #err("Duplicate id") };
        case null { cats.put(c.id, c); #ok() };
      };
    };

    public func updateCategory(c : T.Category) : T.CmsResult {
      switch (cats.get(c.id)) {
        case null { #err("Category not found") };
        case (?(existing)) { cats.put(c.id, c); #ok() };
      };
    };

    public func deleteCategory(id : Text) : T.CmsResult {
      switch (cats.get(id)) {
        case null { #err("Category not found") };
        case (?(c)) { ignore cats.remove(id); #ok() };
      };
    };
  };
}
