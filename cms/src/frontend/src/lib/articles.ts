import type { Identity } from "@dfinity/agent";
import { devActor, queryActor } from "./canister";

// Types should align with your generated candid types eventually.
// For now keep it practical and flexible.
export type CmsResult = { ok?: null; err?: string };

export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  date: string;
  scheduledAt: [] | [bigint];
  tags: string[];
  author: string;
  imageUrl: string;
  metaDesc: string;
  ogImage: string;
  status: { draft?: null; published?: null; scheduled?: null };
  createdAt: bigint;
  updatedAt: bigint;
};

export async function getAllArticles(identity: Identity): Promise<Article[]> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getAllArticles();
}

export async function getPublishedArticles(): Promise<any[]> {
  const actor = await queryActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getPublishedArticles();
}

export async function createArticle(identity: Identity, article: Article): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.createArticle(article);
}

export async function updateArticle(identity: Identity, article: Article): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.updateArticle(article);
}

export async function publishArticle(identity: Identity, id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.publishArticle(id);
}

export async function unpublishArticle(identity: Identity, id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.unpublishArticle(id);
}

export async function deleteArticle(identity: Identity, id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.deleteArticle(id);
}
