/// Access control — manages admins and editors via Internet Identity principals.
import HashMap "mo:base/HashMap";
import Iter    "mo:base/Iter";
import Nat32   "mo:base/Nat32";
import Principal "mo:base/Principal";
import Time    "mo:base/Time";
import T       "../types/Types";

module {

  public type StableState = [(Principal, T.UserRecord)];

  public class Store() {

    var users = HashMap.HashMap<Principal, T.UserRecord>(
      4, Principal.equal, Principal.hash,
    );

    // ── Upgrade persistence ──────────────────────────────────────────────

    public func toStable() : StableState {
      Iter.toArray(users.entries())
    };

    public func fromStable(s : StableState) {
      users := HashMap.HashMap<Principal, T.UserRecord>(
        s.size() + 1, Principal.equal, Principal.hash,
      );
      for ((k, v) in s.vals()) { users.put(k, v) };
    };

    // ── Queries ──────────────────────────────────────────────────────────

    public func isAdmin(p : Principal) : Bool {
      if (Principal.isAnonymous(p)) return false;
      switch (users.get(p)) {
        case (?(u)) { switch (u.role) { case (#admin) true; case _ false } };
        case null false;
      };
    };

    public func isEditor(p : Principal) : Bool {
      if (Principal.isAnonymous(p)) return false;
      switch (users.get(p)) {
        case (?(u)) { true };   // both roles can edit
        case null false;
      };
    };

    public func hasUsers() : Bool { users.size() > 0 };

    public func listUsers() : [T.UserRecord] {
      Iter.toArray(users.vals())
    };

    // ── Mutations ─────────────────────────────────────────────────────────

    /// Bootstrap: callable once when the user store is empty.
    /// After the first admin exists, only admins may call addUser.
    public func bootstrapAdmin(caller : Principal) : T.CmsResult {
      if (Principal.isAnonymous(caller)) return #err("Anonymous caller");
      if (hasUsers())                    return #err("Already bootstrapped — use addUser");
      users.put(caller, { principal = caller; role = #admin; addedAt = Time.now() });
      #ok()
    };

    public func addUser(caller : Principal, p : Principal, role : T.Role) : T.CmsResult {
      if (not isAdmin(caller))              return #err("Unauthorised");
      if (Principal.isAnonymous(p))         return #err("Invalid principal");
      users.put(p, { principal = p; role; addedAt = Time.now() });
      #ok()
    };

    public func removeUser(caller : Principal, p : Principal) : T.CmsResult {
      if (not isAdmin(caller)) return #err("Unauthorised");
      // Prevent removing the last admin
      let admins = Iter.filter(users.vals(), func(u : T.UserRecord) : Bool {
        switch (u.role) { case (#admin) true; case _ false }
      });
      let adminCount = Iter.size(admins);
      switch (users.get(p)) {
        case null { #err("User not found") };
        case (?u) {
          switch (u.role) {
            case (#admin) {
              if (adminCount <= 1) return #err("Cannot remove the last admin");
            };
            case _ {};
          };
          ignore users.remove(p);
          #ok()
        };
      };
    };
  };
}
