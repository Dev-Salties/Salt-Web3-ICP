import { devActor, queryActor } from "./canister";

export type CmsResult = { ok?: null; err?: string };

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  category: string;
  enquiryUrl: string;
  active: boolean;
  createdAt: bigint;
  updatedAt: bigint;
};

export async function getAllProducts(): Promise<Product[]> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getAllProducts();
}

export async function getProducts(): Promise<Product[]> {
  const actor = await queryActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getProducts();
}

export async function createProduct(product: Product): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.createProduct(product);
}

export async function updateProduct(product: Product): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.updateProduct(product);
}

export async function deleteProduct(id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.deleteProduct(id);
}
