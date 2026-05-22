/**
 * @salt-essential/cms-sdk
 *
 * Typed client for the Salt Essential CMS canister.
 * Use this on the public website (Salt-Web3) to read content from the
 * on-chain CMS without coupling the website to the CMS codebase.
 *
 * Usage:
 *   import { createCmsClient } from "@salt-essential/cms-sdk"
 *   const cms = createCmsClient({ canisterId: "your-backend-canister-id" })
 *   const articles = await cms.getPublishedArticles()
 */

import { Actor, HttpAgent } from '@dfinity/agent'

// ── Shared types (mirror of backend Types.mo) ─────────────────────────────

export type ArticleStatus = { draft: null } | { published: null } | { scheduled: null }

export type ArticleIndex = {
  id: string
  slug: string
  title: string
  description: string
  imageUrl: string
  tags: string[]
  date: string
  status: ArticleStatus
}

export type Article = ArticleIndex & {
  body: string
  author: string
  metaDesc: string
  ogImage: string
  scheduledAt: [] | [bigint]
  createdAt: bigint
  updatedAt: bigint
}

export type Product = {
  id: string
  name: string
  price: string
  description: string
  imageUrl: string
  category: string
  enquiryUrl: string
  active: boolean
  createdAt: bigint
  updatedAt: bigint
}

export type Category = {
  id: string
  name: string
  order: bigint
}

export type EmploymentType =
  | { fullTime: null }
  | { partTime: null }
  | { contract: null }
  | { internship: null }

export type Vacancy = {
  id: string
  title: string
  department: string
  summary: string
  location: string
  employmentType: EmploymentType
  description: string
  applyUrl: string
  closingDate: string
  active: boolean
  datePosted: bigint
  updatedAt: bigint
}

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  photoUrl: string
  order: bigint
  createdAt: bigint
  updatedAt: bigint
}

export type CatSession = {
  id: string
  year: string
  week: bigint
  weekLabel: string
  title: string
  topic: string
  date: string
  imageUrl: string
  youtubeUrl: string
  archived: boolean
  order: bigint
}

// ── Minimal hand-written IDL (covers public query methods only) ───────────

function idlFactory({ IDL }: { IDL: typeof import('@dfinity/candid').IDL }) {
  const ArticleStatus = IDL.Variant({
    draft: IDL.Null, published: IDL.Null, scheduled: IDL.Null,
  })
  const ArticleIndex = IDL.Record({
    id: IDL.Text, slug: IDL.Text, title: IDL.Text, description: IDL.Text,
    imageUrl: IDL.Text, tags: IDL.Vec(IDL.Text), date: IDL.Text, status: ArticleStatus,
  })
  const Article = IDL.Record({
    id: IDL.Text, slug: IDL.Text, title: IDL.Text, description: IDL.Text,
    body: IDL.Text, date: IDL.Text, scheduledAt: IDL.Opt(IDL.Int),
    tags: IDL.Vec(IDL.Text), author: IDL.Text, imageUrl: IDL.Text,
    metaDesc: IDL.Text, ogImage: IDL.Text, status: ArticleStatus,
    createdAt: IDL.Int, updatedAt: IDL.Int,
  })
  const Product = IDL.Record({
    id: IDL.Text, name: IDL.Text, price: IDL.Text, description: IDL.Text,
    imageUrl: IDL.Text, category: IDL.Text, enquiryUrl: IDL.Text,
    active: IDL.Bool, createdAt: IDL.Int, updatedAt: IDL.Int,
  })
  const Category = IDL.Record({ id: IDL.Text, name: IDL.Text, order: IDL.Nat })
  const EmploymentType = IDL.Variant({
    fullTime: IDL.Null, partTime: IDL.Null, contract: IDL.Null, internship: IDL.Null,
  })
  const Vacancy = IDL.Record({
    id: IDL.Text, title: IDL.Text, department: IDL.Text, summary: IDL.Text,
    location: IDL.Text, employmentType: EmploymentType, description: IDL.Text,
    applyUrl: IDL.Text, closingDate: IDL.Text, active: IDL.Bool,
    datePosted: IDL.Int, updatedAt: IDL.Int,
  })
  const TeamMember = IDL.Record({
    id: IDL.Text, name: IDL.Text, role: IDL.Text, bio: IDL.Text,
    photoUrl: IDL.Text, order: IDL.Nat, createdAt: IDL.Int, updatedAt: IDL.Int,
  })
  const CatSession = IDL.Record({
    id: IDL.Text, year: IDL.Text, week: IDL.Nat, weekLabel: IDL.Text,
    title: IDL.Text, topic: IDL.Text, date: IDL.Text,
    imageUrl: IDL.Text, youtubeUrl: IDL.Text, archived: IDL.Bool, order: IDL.Nat,
  })

  return IDL.Service({
    getPublishedArticles:  IDL.Func([], [IDL.Vec(ArticleIndex)], ['query']),
    getArticle:            IDL.Func([IDL.Text], [IDL.Opt(Article)], ['query']),
    getArticleBySlug:      IDL.Func([IDL.Text], [IDL.Opt(Article)], ['query']),
    getArticlesByTag:      IDL.Func([IDL.Text], [IDL.Vec(ArticleIndex)], ['query']),
    getProducts:           IDL.Func([], [IDL.Vec(Product)], ['query']),
    getProductsByCategory: IDL.Func([IDL.Text], [IDL.Vec(Product)], ['query']),
    getCategories:         IDL.Func([], [IDL.Vec(Category)], ['query']),
    getActiveVacancies:    IDL.Func([], [IDL.Vec(Vacancy)], ['query']),
    getTeamMembers:        IDL.Func([], [IDL.Vec(TeamMember)], ['query']),
    getCatsLinks:          IDL.Func([], [IDL.Vec(CatSession)], ['query']),
    getCatsLinksByYear:    IDL.Func([IDL.Text], [IDL.Vec(CatSession)], ['query']),
    health:                IDL.Func([], [IDL.Text], ['query']),
  })
}

// ── Client factory ────────────────────────────────────────────────────────

export type CmsClientOptions = {
  canisterId: string
  host?: string        // defaults to https://icp0.io
  local?: boolean      // set true for local dfx replica
}

export type CmsClient = ReturnType<typeof createCmsClient>

export function createCmsClient(opts: CmsClientOptions) {
  const host   = opts.host ?? (opts.local ? 'http://127.0.0.1:4943' : 'https://icp0.io')
  const isLocal = opts.local ?? false

  async function actor() {
    const agent = new HttpAgent({ host })
    if (isLocal) {
      try { await agent.fetchRootKey() } catch { /* replica offline */ }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Actor.createActor<any>(idlFactory as any, { agent, canisterId: opts.canisterId })
  }

  return {
    /** Published article listing (no body — fast for index pages). */
    getPublishedArticles: async (): Promise<ArticleIndex[]> =>
      (await actor()).getPublishedArticles(),

    /** Full article by numeric ID (includes body HTML). */
    getArticle: async (id: string): Promise<Article | null> => {
      const res: [] | [Article] = await (await actor()).getArticle(id)
      return res.length ? res[0] : null
    },

    /** Full article by slug. */
    getArticleBySlug: async (slug: string): Promise<Article | null> => {
      const res: [] | [Article] = await (await actor()).getArticleBySlug(slug)
      return res.length ? res[0] : null
    },

    /** Articles filtered by a single tag. */
    getArticlesByTag: async (tag: string): Promise<ArticleIndex[]> =>
      (await actor()).getArticlesByTag(tag),

    /** All active products. */
    getProducts: async (): Promise<Product[]> =>
      (await actor()).getProducts(),

    /** Products filtered by category name. */
    getProductsByCategory: async (category: string): Promise<Product[]> =>
      (await actor()).getProductsByCategory(category),

    /** All product categories. */
    getCategories: async (): Promise<Category[]> =>
      (await actor()).getCategories(),

    /** Active job vacancies. */
    getActiveVacancies: async (): Promise<Vacancy[]> =>
      (await actor()).getActiveVacancies(),

    /** Team members ordered by display order. */
    getTeamMembers: async (): Promise<TeamMember[]> =>
      (await actor()).getTeamMembers(),

    /** All active (non-archived) CAT sessions, newest year first. */
    getCatsLinks: async (): Promise<CatSession[]> =>
      (await actor()).getCatsLinks(),

    /** CAT sessions for a specific year. */
    getCatsLinksByYear: async (year: string): Promise<CatSession[]> =>
      (await actor()).getCatsLinksByYear(year),

    /** Canister health string. */
    health: async (): Promise<string> =>
      (await actor()).health(),
  }
}
