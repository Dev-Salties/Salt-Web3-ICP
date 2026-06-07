import { devActor, queryActor } from "./canister";

export type CmsResult = { ok?: null; err?: string };

export type Category = {
  id: string;
  name: string;
  order: bigint;
};

export async function getCategories(): Promise<Category[]> {
  const actor = await queryActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getCategories();
}

export async function createCategory(category: Category): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.createCategory(category);
}

export async function updateCategory(category: Category): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.updateCategory(category);
}

export async function deleteCategory(id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.deleteCategory(id);
}