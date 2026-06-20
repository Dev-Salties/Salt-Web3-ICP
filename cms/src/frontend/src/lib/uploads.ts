import { Actor, HttpAgent, type Identity } from "@dfinity/agent";
import { AssetManager } from "@dfinity/assets";

const UPLOADS_CANISTER_ID = (import.meta.env.VITE_CANISTER_ID_UPLOADS as string) ?? "";
const DFX_NETWORK = (import.meta.env.VITE_DFX_NETWORK as string) ?? "local";
const IS_LOCAL = DFX_NETWORK === "local";
const IC_HOST = IS_LOCAL ? "http://127.0.0.1:4943" : "https://icp0.io";

async function makeAgent(identity: Identity): Promise<HttpAgent> {
  const agent = new HttpAgent({ host: IC_HOST, identity });
  if (IS_LOCAL) {
    try { await agent.fetchRootKey(); } catch { /* replica may be offline */ }
  }
  return agent;
}

/**
 * Uploads a file to the ICP uploads canister.
 * Returns the public URL of the uploaded file.
 */
export async function uploadFile(identity: Identity, file: File): Promise<string> {
  if (!UPLOADS_CANISTER_ID) throw new Error("VITE_CANISTER_ID_UPLOADS is not set");

  const agent = await makeAgent(identity);

  const assetManager = new AssetManager({
    canisterId: UPLOADS_CANISTER_ID,
    agent,
  });

  // Use timestamp + original name to avoid collisions
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const path = `/uploads/${fileName}`;

  const buffer = await file.arrayBuffer();

  await assetManager.store(new Uint8Array(buffer), {
    fileName: path,
    contentType: file.type,
  });

  // Return the public URL
  if (IS_LOCAL) {
    return `http://${UPLOADS_CANISTER_ID}.localhost:4943${path}`;
  }
  return `https://${UPLOADS_CANISTER_ID}.icp0.io${path}`;
}
