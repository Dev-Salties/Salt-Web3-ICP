import { devActor, queryActor } from "./canister";

export type CmsResult = { ok?: null; err?: string };

export type CatSession = {
  id: string;
  year: string;
  week: bigint;
  weekLabel: string;
  title: string;
  topic: string;
  date: string;
  imageUrl: string;
  youtubeUrl: string;
  archived: boolean;
  order: bigint;
};

export async function getCatsLinks(): Promise<CatSession[]> {
  const actor = await queryActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getCatsLinks();
}

export async function getCatsLinksByYear(year: string): Promise<CatSession[]> {
  const actor = await queryActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getCatsLinksByYear(year);
}

export async function getAllCatSessions(): Promise<CatSession[]> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getAllCatSessions();
}

export async function upsertCatSession(session: CatSession): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.upsertCatSession(session);
}

export async function createCatSession(session: CatSession): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.createCatSession(session);
}

export async function updateCatSession(session: CatSession): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.updateCatSession(session);
}

export async function archiveCatSession(id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.archiveCatSession(id);
}

export async function unarchiveCatSession(id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.unarchiveCatSession(id);
}

export async function deleteCatSession(id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.deleteCatSession(id);
}