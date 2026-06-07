import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Article {
  'id' : string,
  'status' : ArticleStatus,
  'title' : string,
  'metaDesc' : string,
  'body' : string,
  'date' : string,
  'createdAt' : bigint,
  'slug' : string,
  'tags' : Array<string>,
  'description' : string,
  'author' : string,
  'updatedAt' : bigint,
  'imageUrl' : string,
  'ogImage' : string,
  'scheduledAt' : [] | [bigint],
}
export interface ArticleIndex {
  'id' : string,
  'status' : ArticleStatus,
  'title' : string,
  'date' : string,
  'slug' : string,
  'tags' : Array<string>,
  'description' : string,
  'imageUrl' : string,
}
export type ArticleStatus = { 'scheduled' : null } |
  { 'published' : null } |
  { 'draft' : null };
export interface CatSession {
  'id' : string,
  'title' : string,
  'topic' : string,
  'order' : bigint,
  'date' : string,
  'week' : bigint,
  'year' : string,
  'imageUrl' : string,
  'youtubeUrl' : string,
  'weekLabel' : string,
  'archived' : boolean,
}
export interface Category { 'id' : string, 'order' : bigint, 'name' : string }
export type CmsResult = { 'ok' : null } |
  { 'err' : string };
export type EmploymentType = { 'internship' : null } |
  { 'contract' : null } |
  { 'partTime' : null } |
  { 'fullTime' : null };
export interface Product {
  'id' : string,
  'active' : boolean,
  'name' : string,
  'createdAt' : bigint,
  'description' : string,
  'updatedAt' : bigint,
  'imageUrl' : string,
  'category' : string,
  'enquiryUrl' : string,
  'price' : string,
}
export type Role = { 'admin' : null } |
  { 'editor' : null };
export interface SaltCms {
  'addUser' : ActorMethod<[Principal, Role], CmsResult>,
  'archiveCatSession' : ActorMethod<[string], CmsResult>,
  'bootstrapAdmin' : ActorMethod<[], CmsResult>,
  'createArticle' : ActorMethod<[Article], CmsResult>,
  'createCatSession' : ActorMethod<[CatSession], CmsResult>,
  'createCategory' : ActorMethod<[Category], CmsResult>,
  'createProduct' : ActorMethod<[Product], CmsResult>,
  'createTeamMember' : ActorMethod<[TeamMember], CmsResult>,
  'createVacancy' : ActorMethod<[Vacancy], CmsResult>,
  'deleteArticle' : ActorMethod<[string], CmsResult>,
  'deleteCatSession' : ActorMethod<[string], CmsResult>,
  'deleteCategory' : ActorMethod<[string], CmsResult>,
  'deleteProduct' : ActorMethod<[string], CmsResult>,
  'deleteTeamMember' : ActorMethod<[string], CmsResult>,
  'deleteVacancy' : ActorMethod<[string], CmsResult>,
  'getActiveVacancies' : ActorMethod<[], Array<Vacancy>>,
  'getAllArticles' : ActorMethod<[], Array<Article>>,
  'getAllCatSessions' : ActorMethod<[], Array<CatSession>>,
  'getAllProducts' : ActorMethod<[], Array<Product>>,
  'getAllVacancies' : ActorMethod<[], Array<Vacancy>>,
  'getArticle' : ActorMethod<[string], [] | [Article]>,
  'getArticleBySlug' : ActorMethod<[string], [] | [Article]>,
  'getArticlesByTag' : ActorMethod<[string], Array<ArticleIndex>>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getCatsLinks' : ActorMethod<[], Array<CatSession>>,
  'getCatsLinksByYear' : ActorMethod<[string], Array<CatSession>>,
  'getProducts' : ActorMethod<[], Array<Product>>,
  'getProductsByCategory' : ActorMethod<[string], Array<Product>>,
  'getPublishedArticles' : ActorMethod<[], Array<ArticleIndex>>,
  'getTeamMembers' : ActorMethod<[], Array<TeamMember>>,
  'health' : ActorMethod<[], string>,
  'is_admin' : ActorMethod<[], boolean>,
  'is_editor' : ActorMethod<[], boolean>,
  'listUsers' : ActorMethod<[], Array<UserRecord>>,
  'publishArticle' : ActorMethod<[string], CmsResult>,
  'removeUser' : ActorMethod<[Principal], CmsResult>,
  'unarchiveCatSession' : ActorMethod<[string], CmsResult>,
  'unpublishArticle' : ActorMethod<[string], CmsResult>,
  'updateArticle' : ActorMethod<[Article], CmsResult>,
  'updateCatSession' : ActorMethod<[CatSession], CmsResult>,
  'updateCategory' : ActorMethod<[Category], CmsResult>,
  'updateProduct' : ActorMethod<[Product], CmsResult>,
  'updateTeamMember' : ActorMethod<[TeamMember], CmsResult>,
  'updateVacancy' : ActorMethod<[Vacancy], CmsResult>,
  'upsertCatSession' : ActorMethod<[CatSession], CmsResult>,
  'whoami' : ActorMethod<[], string>,
}
export interface TeamMember {
  'id' : string,
  'motto' : string,
  'order' : bigint,
  'bestPart' : string,
  'name' : string,
  'createdAt' : bigint,
  'role' : string,
  'photoUrl' : string,
  'updatedAt' : bigint,
  'whyLove' : string,
}
export interface UserRecord {
  'principal' : Principal,
  'role' : Role,
  'addedAt' : bigint,
}
export interface Vacancy {
  'id' : string,
  'title' : string,
  'active' : boolean,
  'applyUrl' : string,
  'description' : string,
  'employmentType' : EmploymentType,
  'summary' : string,
  'updatedAt' : bigint,
  'datePosted' : bigint,
  'closingDate' : string,
  'department' : string,
  'location' : string,
}
export interface _SERVICE extends SaltCms {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
