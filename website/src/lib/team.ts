import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/backend/backend.did.js";

const BACKEND_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_BACKEND as string;

const HOST =
  ((import.meta.env.VITE_DFX_NETWORK as string) ?? "local") === "local"
    ? "http://127.0.0.1:4943"
    : "https://icp0.io";

export type WebsiteTeamMember = {
  id: string;
  name: string;
  role: string;
  motto: string;
  whyLove: string;
  bestPart: string;
  photoUrl: string;
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

function normalizeTeamMember(m: any): WebsiteTeamMember | null {
  if (!m) return null;

  const id = typeof m.id === "string" ? m.id : String(m.id ?? "");
  const name = typeof m.name === "string" ? m.name : String(m.name ?? "");
  const role = typeof m.role === "string" ? m.role : String(m.role ?? "");
  const motto = typeof m.motto === "string" ? m.motto : String(m.motto ?? "");
  const whyLove = typeof m.whyLove === "string" ? m.whyLove : String(m.whyLove ?? "");
  const bestPart = typeof m.bestPart === "string" ? m.bestPart : String(m.bestPart ?? "");
  const photoUrl =
    typeof m.photoUrl === "string"
      ? m.photoUrl
      : "/Sections/Salt-blue-header-services.jpg";

  const order =
    typeof m.order === "string"
      ? Number(m.order)
      : typeof m.order === "number"
        ? m.order
        : 0;

  if (!id || !name) return null;

  return {
    id,
    name,
    role,
    motto,
    whyLove,
    bestPart,
    photoUrl,
    order,
  };
}

export async function fetchTeamMembers(): Promise<WebsiteTeamMember[]> {
  const actor = await makeActor();

  // @ts-ignore
  const raw = await actor.getTeamMembers();

  if (!Array.isArray(raw)) return [];

  const result = sanitizeBigInts(raw) as any[];

  return result
    .map(normalizeTeamMember)
    .filter((m): m is WebsiteTeamMember => m !== null)
    .sort((a, b) => a.order - b.order);
}