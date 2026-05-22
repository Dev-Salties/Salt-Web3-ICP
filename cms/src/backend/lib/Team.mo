/// Team members module.
import Array   "mo:base/Array";
import Order "mo:base/Order";
import HashMap "mo:base/HashMap";
import Iter    "mo:base/Iter";
import Nat     "mo:base/Nat";
import Text    "mo:base/Text";
import Time    "mo:base/Time";
import T       "../types/Types";

module {

  public type StableState = [(Text, T.TeamMember)];

  public class Store() {

    var members = HashMap.HashMap<Text, T.TeamMember>(
      4, Text.equal, Text.hash,
    );

    public func toStable() : StableState { Iter.toArray(members.entries()) };

    public func fromStable(s : StableState) {
      members := HashMap.HashMap<Text, T.TeamMember>(
        s.size() + 1,
        Text.equal,
        Text.hash
      );
      for ((k, v) in s.vals()) { members.put(k, v) };
    };

    public func getTeamMembers() : [T.TeamMember] {
      Array.sort<T.TeamMember>(
        Iter.toArray(members.vals()),
        func (a : T.TeamMember, b : T.TeamMember) : Order.Order {
          Nat.compare(a.order, b.order)
        }
      )
    };

    public func createTeamMember(m : T.TeamMember) : T.CmsResult {
      switch (members.get(m.id)) {
        case (?(existing)) { #err("Duplicate id") };
        case null { members.put(m.id, m); #ok() };
      };
    };

    public func updateTeamMember(m : T.TeamMember) : T.CmsResult {
      switch (members.get(m.id)) {
        case null { #err("Member not found") };
        case (?(existing)) {
          members.put(m.id, { m with updatedAt = Time.now() });
          #ok()
        };
      };
    };

    public func deleteTeamMember(id : Text) : T.CmsResult {
      switch (members.get(id)) {
        case null { #err("Member not found") };
        case (?(m)) { ignore members.remove(id); #ok() };
      };
    };

    public func size() : Nat { members.size() };
  };
}
