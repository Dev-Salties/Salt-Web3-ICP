/// Salt Essential CMS — main actor.
/// Composes all domain modules into a single deployable canister.
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat  "mo:base/Nat";
import T    "./types/Types";
import AccessLib    "./lib/Access";
import ArticlesLib  "./lib/Articles";
import ProductsLib  "./lib/Products";
import VacanciesLib "./lib/Vacancies";
import TeamLib      "./lib/Team";
import CatsLib      "./lib/Cats";
import CatsLib2     "./lib/Categories";

shared actor class SaltCms() {

  // ── Stable storage (survives upgrades) ───────────────────────────────────

  stable var stableAccess     : AccessLib.StableState     = [];
  stable var stableArticles   : ArticlesLib.StableState   = [];
  stable var stableProducts   : ProductsLib.StableState   = [];
  stable var stableVacancies  : VacanciesLib.StableState  = [];
  stable var stableTeam       : TeamLib.StableState       = [];
  stable var stableCats       : CatsLib.StableState       = [];
  stable var stableCategories : CatsLib2.StableState      = [];

  // ── Module instances ──────────────────────────────────────────────────────

  let access     = AccessLib.Store();
  let articles   = ArticlesLib.Store();
  let products   = ProductsLib.Store();
  let vacancies  = VacanciesLib.Store();
  let team       = TeamLib.Store();
  let cats       = CatsLib.Store();
  let categories = CatsLib2.Store();

  // ── Upgrade hooks ─────────────────────────────────────────────────────────

  system func preupgrade() {
    stableAccess     := access.toStable();
    stableArticles   := articles.toStable();
    stableProducts   := products.toStable();
    stableVacancies  := vacancies.toStable();
    stableTeam       := team.toStable();
    stableCats       := cats.toStable();
    stableCategories := categories.toStable();
  };

  system func postupgrade() {
    access.fromStable(stableAccess);
    articles.fromStable(stableArticles);
    products.fromStable(stableProducts);
    vacancies.fromStable(stableVacancies);
    team.fromStable(stableTeam);
    cats.fromStable(stableCats);
    categories.fromStable(stableCategories);
  };

  // ── Heartbeat: auto-publish scheduled articles (~5 min intervals) ─────────

  system func heartbeat() : async () {
    articles.processScheduled(Time.now());
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCESS CONTROL
  // ═══════════════════════════════════════════════════════════════════════════

  /// First call ever — makes the caller the first admin. Fails once bootstrapped.
  public shared (msg) func bootstrapAdmin() : async T.CmsResult {
    access.bootstrapAdmin(msg.caller)
  };

  public shared (msg) func addUser(p : Principal, role : T.Role) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    access.addUser(msg.caller, p, role)
  };

  public shared (msg) func removeUser(p : Principal) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    access.removeUser(msg.caller, p)
  };

  /// Returns caller principal as text (useful for debugging + UI display)
  public query (msg) func whoami() : async Text {
    Principal.toText(msg.caller)
  };

  /// True if caller is an admin (principal allowlist role check)
  public query (msg) func is_admin() : async Bool {
    access.isAdmin(msg.caller)
  };

  /// True if caller is editor/admin (your Access.mo treats any stored user as editor-capable)
  public query (msg) func is_editor() : async Bool {
    access.isEditor(msg.caller)
  };

  public query (msg) func listUsers() : async [T.UserRecord] {
    if (not access.isAdmin(msg.caller)) return [];
    access.listUsers()
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ARTICLES  (public reads · editor/admin writes · admin publish)
  // ═══════════════════════════════════════════════════════════════════════════

  public query func getPublishedArticles() : async [T.ArticleIndex] {
    articles.getPublishedIndex()
  };

  public query func getArticle(id : Text) : async ?T.Article {
    articles.getArticle(id)
  };

  public query func getArticleBySlug(slug : Text) : async ?T.Article {
    articles.getArticleBySlug(slug)
  };

  public query func getArticlesByTag(tag : Text) : async [T.ArticleIndex] {
    articles.getArticlesByTag(tag)
  };

  public shared (msg) func getAllArticles() : async [T.Article] {
    if (not access.isEditor(msg.caller)) return [];
    articles.getAllArticles()
  };

  public shared (msg) func createArticle(a : T.Article) : async T.CmsResult {
    if (not access.isEditor(msg.caller)) return #err("Unauthorised");
    articles.createArticle(a)
  };

  public shared (msg) func updateArticle(a : T.Article) : async T.CmsResult {
    if (not access.isEditor(msg.caller)) return #err("Unauthorised");
    articles.updateArticle(a)
  };

  public shared (msg) func publishArticle(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised — only admins can publish");
    articles.publishArticle(id)
  };

  public shared (msg) func unpublishArticle(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    articles.unpublishArticle(id)
  };

  public shared (msg) func deleteArticle(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    articles.deleteArticle(id)
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PRODUCTS
  // ═══════════════════════════════════════════════════════════════════════════

  public query func getProducts() : async [T.Product] {
    products.getActiveProducts()
  };

  public query func getProductsByCategory(cat : Text) : async [T.Product] {
    products.getProductsByCategory(cat)
  };

  public shared (msg) func getAllProducts() : async [T.Product] {
    if (not access.isEditor(msg.caller)) return [];
    products.getAllProducts()
  };

  public shared (msg) func createProduct(p : T.Product) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    products.createProduct(p)
  };

  public shared (msg) func updateProduct(p : T.Product) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    products.updateProduct(p)
  };

  public shared (msg) func deleteProduct(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    products.deleteProduct(id)
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORIES
  // ═══════════════════════════════════════════════════════════════════════════

  public query func getCategories() : async [T.Category] {
    categories.getCategories()
  };

  public shared (msg) func createCategory(c : T.Category) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    categories.createCategory(c)
  };

  public shared (msg) func updateCategory(c : T.Category) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    categories.updateCategory(c)
  };

  public shared (msg) func deleteCategory(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    categories.deleteCategory(id)
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // VACANCIES
  // ═══════════════════════════════════════════════════════════════════════════

  public query func getActiveVacancies() : async [T.Vacancy] {
    vacancies.getActiveVacancies()
  };

  public shared (msg) func getAllVacancies() : async [T.Vacancy] {
    if (not access.isEditor(msg.caller)) return [];
    vacancies.getAllVacancies()
  };

  public shared (msg) func createVacancy(v : T.Vacancy) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    vacancies.createVacancy(v)
  };

  public shared (msg) func updateVacancy(v : T.Vacancy) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    vacancies.updateVacancy(v)
  };

  public shared (msg) func deleteVacancy(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    vacancies.deleteVacancy(id)
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // TEAM
  // ═══════════════════════════════════════════════════════════════════════════

  public query func getTeamMembers() : async [T.TeamMember] {
    team.getTeamMembers()
  };

  public shared (msg) func createTeamMember(m : T.TeamMember) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    team.createTeamMember(m)
  };

  public shared (msg) func updateTeamMember(m : T.TeamMember) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    team.updateTeamMember(m)
  };

  public shared (msg) func deleteTeamMember(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    team.deleteTeamMember(id)
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // CAT SESSIONS
  // ═══════════════════════════════════════════════════════════════════════════

  public query func getCatsLinks() : async [T.CatSession] {
    cats.getActiveSessions()
  };

  public query func getCatsLinksByYear(year : Text) : async [T.CatSession] {
    cats.getSessionsByYear(year)
  };

  public shared (msg) func getAllCatSessions() : async [T.CatSession] {
    if (not access.isAdmin(msg.caller)) return [];
    cats.getAllSessions()
  };

  /// Upsert by (year, week) key — re-submitting the same pair updates the URL.
  public shared (msg) func upsertCatSession(s : T.CatSession) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    cats.upsertSession(s)
  };

  public shared (msg) func createCatSession(s : T.CatSession) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    cats.createSession(s)
  };

  public shared (msg) func updateCatSession(s : T.CatSession) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    cats.updateSession(s)
  };

  public shared (msg) func archiveCatSession(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    cats.archiveSession(id)
  };

  public shared (msg) func unarchiveCatSession(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    cats.unarchiveSession(id)
  };

  public shared (msg) func deleteCatSession(id : Text) : async T.CmsResult {
    if (not access.isAdmin(msg.caller)) return #err("Unauthorised");
    cats.deleteSession(id)
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // HEALTH
  // ═══════════════════════════════════════════════════════════════════════════

  public query func health() : async Text {
    "salt_cms ok"
    # " | articles="   # Nat.toText(articles.size())
    # " products="     # Nat.toText(products.size())
    # " vacancies="    # Nat.toText(vacancies.size())
    # " team="         # Nat.toText(team.size())
    # " cats="         # Nat.toText(cats.size())
  };
}
