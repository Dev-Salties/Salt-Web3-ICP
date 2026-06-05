import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/backend/index.js";

const BACKEND_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_BACKEND as string;

const HOST =
  ((import.meta.env.VITE_DFX_NETWORK as string) ?? "local") === "local"
    ? "http://127.0.0.1:4943"
    : "https://icp0.io";

export type WebsiteArticleIndex = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
};

export type WebsiteArticle = WebsiteArticleIndex & {
  body: string;
  author: string;
  metaDesc: string;
  ogImage: string;
};

async function makeActor() {
  const agent = new HttpAgent({ host: HOST });

  if (HOST.includes("127.0.0.1")) {
    try {
      await agent.fetchRootKey();
    } catch {}
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: BACKEND_CANISTER_ID,
  });
}

function sanitizeBigInts(value: any): any {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeBigInts);
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, sanitizeBigInts(v)])
    );
  }
  return value;
}

function bigIntToDateString(value: any): string {
  if (typeof value === "string") {
    if (value.includes("-")) return value;

    const ms = Math.floor(Number(value) / 1_000_000);
    if (isNaN(ms) || ms <= 0) return value;

    const d = new Date(ms);
    if (isNaN(d.getTime())) return value;

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  if (typeof value === "bigint") {
    const ms = Number(value / 1_000_000n);
    const d = new Date(ms);
    if (isNaN(d.getTime())) return "";

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  if (typeof value === "number") {
    const ms = value > 1e12 ? value / 1_000_000 : value;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return "";

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  return String(value ?? "");
}

function normalizeArticleIndex(a: any): WebsiteArticleIndex | null {
  if (!a) return null;

  const slug = typeof a.slug === "string" ? a.slug : String(a.slug ?? "");
  const title = typeof a.title === "string" ? a.title : String(a.title ?? "");
  const description =
    typeof a.description === "string"
      ? a.description
      : String(a.description ?? "");
  const image =
    typeof a.imageUrl === "string"
      ? a.imageUrl
      : typeof a.image === "string"
        ? a.image
        : "/Sections/Salt-blue-header-services.jpg";
  const tags = Array.isArray(a.tags)
    ? a.tags.map((t: any) => String(t))
    : [];

  const date = bigIntToDateString(a.date);

  if (!slug || !title) return null;

  return {
    slug,
    title,
    description,
    image,
    tags,
    date,
  };
}

function normalizeArticle(a: any): WebsiteArticle | null {
  if (!a) return null;

  const slug = typeof a.slug === "string" ? a.slug : String(a.slug ?? "");
  const title = typeof a.title === "string" ? a.title : String(a.title ?? "");
  const description =
    typeof a.description === "string"
      ? a.description
      : String(a.description ?? "");
  const image =
    typeof a.imageUrl === "string"
      ? a.imageUrl
      : typeof a.image === "string"
        ? a.image
        : "/Sections/Salt-blue-header-services.jpg";
  const tags = Array.isArray(a.tags)
    ? a.tags.map((t: any) => String(t))
    : [];

  const date = bigIntToDateString(a.date);
  const body = typeof a.body === "string" ? a.body : String(a.body ?? "");
  const author = typeof a.author === "string" ? a.author : String(a.author ?? "");
  const metaDesc =
    typeof a.metaDesc === "string" ? a.metaDesc : String(a.metaDesc ?? "");
  const ogImage =
    typeof a.ogImage === "string" ? a.ogImage : String(a.ogImage ?? "");

  if (!slug || !title) return null;

  return {
    slug,
    title,
    description,
    image,
    tags,
    date,
    body,
    author,
    metaDesc,
    ogImage,
  };
}

export async function fetchPublishedArticles(): Promise<WebsiteArticleIndex[]> {
  const actor = await makeActor();

  // @ts-ignore
  const raw = await actor.getPublishedArticles();

  if (!Array.isArray(raw)) return [];

  const result = sanitizeBigInts(raw) as any[];

  return result
    .map(normalizeArticleIndex)
    .filter((a): a is WebsiteArticleIndex => a !== null);
}

export async function fetchArticleBySlug(slug: string): Promise<WebsiteArticle | null> {
  const actor = await makeActor();

  // @ts-ignore
  const raw = await actor.getArticleBySlug(slug);

  // DFINITY opt values usually come back as [] or [value]
  if (!Array.isArray(raw) || raw.length === 0) {
    return null;
  }

  const result = sanitizeBigInts(raw[0]);
  return normalizeArticle(result);
}
