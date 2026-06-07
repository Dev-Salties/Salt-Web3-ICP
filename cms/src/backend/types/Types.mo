/// Shared types for the Salt Essential CMS backend.
module {

  // ── Role ──────────────────────────────────────────────────────────────────
  public type Role = { #admin; #editor };

  // ── Result helpers ────────────────────────────────────────────────────────
  public type CmsResult  = { #ok : (); #err : Text };
  public type TextResult = { #ok : Text; #err : Text };

  // ── Article ───────────────────────────────────────────────────────────────
  public type ArticleStatus = { #draft; #published; #scheduled };

  public type Article = {
    id          : Text;
    slug        : Text;
    title       : Text;
    description : Text;   // listing excerpt
    body        : Text;   // rich-text HTML
    date        : Text;   // ISO-8601 publish date
    scheduledAt : ?Int;   // Unix nanos — auto-publishes when reached
    tags        : [Text];
    author      : Text;
    imageUrl    : Text;
    metaDesc    : Text;
    ogImage     : Text;
    status      : ArticleStatus;
    createdAt   : Int;    // Unix nanos
    updatedAt   : Int;
  };

  public type ArticleIndex = {
    id          : Text;
    slug        : Text;
    title       : Text;
    description : Text;
    imageUrl    : Text;
    tags        : [Text];
    date        : Text;
    status      : ArticleStatus;
  };

  // ── Product ───────────────────────────────────────────────────────────────
  public type Product = {
    id          : Text;
    name        : Text;
    price       : Text;
    description : Text;
    imageUrl    : Text;
    category    : Text;
    enquiryUrl  : Text;   // optional — empty string if absent
    active      : Bool;
    createdAt   : Int;
    updatedAt   : Int;
  };

  // ── Category ──────────────────────────────────────────────────────────────
  public type Category = {
    id    : Text;
    name  : Text;
    order : Nat;
  };

  // ── Vacancy ───────────────────────────────────────────────────────────────
  public type EmploymentType = { #fullTime; #partTime; #contract; #internship };

  public type Vacancy = {
    id             : Text;
    title          : Text;
    department     : Text;
    summary        : Text;   // one-liner shown on listing
    location       : Text;
    employmentType : EmploymentType;
    description    : Text;   // full JD
    applyUrl       : Text;   // optional — empty string if absent
    closingDate    : Text;   // ISO-8601
    active         : Bool;
    datePosted     : Int;    // Unix nanos
    updatedAt      : Int;
  };

  // ── Team Member ───────────────────────────────────────────────────────────
  public type TeamMember = {
    id        : Text;
    name      : Text;
    role      : Text;
    motto     : Text;
    whyLove   : Text;
    bestPart  : Text;
    photoUrl  : Text;
    order     : Nat;
    createdAt : Int;
    updatedAt : Int;
  };
  // ── CAT Session ───────────────────────────────────────────────────────────
  /// `archived = true` hides the session from the public query without
  /// deleting it — this is the preferred way to retire past years while
  /// keeping the on-chain history intact.
  public type CatSession = {
    id         : Text;   // e.g. "2025-week1"
    year       : Text;   // grouping key, e.g. "2025"
    week       : Nat;    // 1–16
    weekLabel  : Text;   // e.g. "Week 1"
    title      : Text;
    topic      : Text;
    date       : Text;   // human-readable, e.g. "21 Feb 2025"
    imageUrl   : Text;
    youtubeUrl : Text;   // empty = coming soon
    archived   : Bool;
    order      : Nat;    // display order within year
  };

  // ── Access / Principal record ─────────────────────────────────────────────
  public type UserRecord = {
    principal : Principal;
    role      : Role;
    addedAt   : Int;
  };
}
