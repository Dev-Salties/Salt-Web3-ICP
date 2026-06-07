import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/backend/backend.did.js";

const BACKEND_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_BACKEND as string;

const HOST =
  ((import.meta.env.VITE_DFX_NETWORK as string) ?? "local") === "local"
    ? "http://127.0.0.1:4943"
    : "https://icp0.io";

export type WebsiteCatSession = {
  id: string;
  year: string;
  week: number;
  weekLabel: string;
  title: string;
  topic: string;
  date: string;
  imageUrl: string;
  youtubeUrl: string;
  archived: boolean;
  order: number;
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
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(sanitizeBigInts);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, sanitizeBigInts(v)])
    );
  }
  return value;
}

function normalizeCatSession(s: any): WebsiteCatSession | null {
  if (!s) return null;

  const id = typeof s.id === "string" ? s.id : String(s.id ?? "");
  const year = typeof s.year === "string" ? s.year : String(s.year ?? "");
  const week =
    typeof s.week === "string"
      ? Number(s.week)
      : typeof s.week === "number"
      ? s.week
      : 0;
  const weekLabel =
    typeof s.weekLabel === "string" ? s.weekLabel : String(s.weekLabel ?? "");
  const title = typeof s.title === "string" ? s.title : String(s.title ?? "");
  const topic = typeof s.topic === "string" ? s.topic : String(s.topic ?? "");
  const date = typeof s.date === "string" ? s.date : String(s.date ?? "");
  const imageUrl =
    typeof s.imageUrl === "string" ? s.imageUrl : "/CATs/fallback.jpg";
  const youtubeUrl =
    typeof s.youtubeUrl === "string" ? s.youtubeUrl : String(s.youtubeUrl ?? "");
  const archived =
    typeof s.archived === "boolean"
      ? s.archived
      : String(s.archived ?? "") === "true";
  const order =
    typeof s.order === "string"
      ? Number(s.order)
      : typeof s.order === "number"
      ? s.order
      : 0;

  if (!id || !year || !title) return null;

  return {
    id,
    year,
    week,
    weekLabel,
    title,
    topic,
    date,
    imageUrl,
    youtubeUrl,
    archived,
    order,
  };
}

export async function fetchCatsLinks(): Promise<WebsiteCatSession[]> {
  const actor = await makeActor();

  // @ts-ignore
  const raw = await actor.getCatsLinks();

  if (!Array.isArray(raw)) return [];

  const result = sanitizeBigInts(raw) as any[];

  return result
    .map(normalizeCatSession)
    .filter((s): s is WebsiteCatSession => s !== null)
    .filter((s) => !s.archived)
    .sort((a, b) => {
      if (a.year !== b.year) return Number(b.year) - Number(a.year);
      return a.order - b.order;
    });
}