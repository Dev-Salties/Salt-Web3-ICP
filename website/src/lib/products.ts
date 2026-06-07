import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/backend/backend.did.js";

const BACKEND_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_BACKEND as string;

const HOST =
  ((import.meta.env.VITE_DFX_NETWORK as string) ?? "local") === "local"
    ? "http://127.0.0.1:4943"
    : "https://icp0.io";

export type WebsiteProduct = {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  category: string;
  enquiryUrl: string;
  active: boolean;
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

function normalizeProduct(p: any): WebsiteProduct | null {
  if (!p) return null;

  const id = typeof p.id === "string" ? p.id : String(p.id ?? "");
  const name = typeof p.name === "string" ? p.name : String(p.name ?? "");
  const price = typeof p.price === "string" ? p.price : String(p.price ?? "");
  const description =
    typeof p.description === "string" ? p.description : String(p.description ?? "");
  const imageUrl =
    typeof p.imageUrl === "string"
      ? p.imageUrl
      : "/Products/fallback.jpg";
  const category =
    typeof p.category === "string" ? p.category : String(p.category ?? "");
  const enquiryUrl =
    typeof p.enquiryUrl === "string" ? p.enquiryUrl : String(p.enquiryUrl ?? "");
  const active =
    typeof p.active === "boolean"
      ? p.active
      : String(p.active ?? "") === "true";

  if (!id || !name) return null;

  return {
    id,
    name,
    price,
    description,
    imageUrl,
    category,
    enquiryUrl,
    active,
  };
}

export async function fetchProducts(): Promise<WebsiteProduct[]> {
  const actor = await makeActor();

  // @ts-ignore
  const raw = await actor.getProducts();

  if (!Array.isArray(raw)) return [];

  const result = sanitizeBigInts(raw) as any[];

  return result
    .map(normalizeProduct)
    .filter((p): p is WebsiteProduct => p !== null);
}