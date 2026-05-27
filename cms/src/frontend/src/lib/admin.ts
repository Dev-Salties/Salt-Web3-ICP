import { updateActor } from "./canister";
import type { Identity } from "@dfinity/agent";

export async function bootstrapAdmin(identity: Identity) {
  const actor = await updateActor(identity);
  if (!actor) throw new Error("Backend actor not available");

  // @ts-ignore depends on your generated declarations typing
  return await actor.bootstrapAdmin();
}