import type { Identity } from "@dfinity/agent";
import { updateActor } from "./canister";

export async function isAdmin(identity: Identity): Promise<boolean> {
  const actor = await updateActor(identity);
  if (!actor) return false;
  // @ts-ignore - generated bindings typing may differ
  return Boolean(await actor.is_admin());
}

export async function isEditor(identity: Identity): Promise<boolean> {
  const actor = await updateActor(identity);
  if (!actor) return false;
  // @ts-ignore
  return Boolean(await actor.is_editor());
}