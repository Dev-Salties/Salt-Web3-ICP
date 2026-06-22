import { HttpAgent, Actor, type Identity } from "@dfinity/agent";

const UPLOADS_CANISTER_ID = (import.meta.env.VITE_CANISTER_ID_UPLOADS as string) ?? "";
const DFX_NETWORK = (import.meta.env.VITE_DFX_NETWORK as string) ?? "local";
const IS_LOCAL = DFX_NETWORK === "local";
const IC_HOST = IS_LOCAL ? "http://127.0.0.1:4943" : "https://icp0.io";

const idlFactory = ({ IDL }: any) => {
  const BatchId = IDL.Nat;
  const ChunkId = IDL.Nat;
  const Key = IDL.Text;
  const CreateAssetArguments = IDL.Record({
    key: Key,
    content_type: IDL.Text,
    max_age: IDL.Opt(IDL.Nat64),
    headers: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))),
    enable_aliasing: IDL.Opt(IDL.Bool),
    allow_raw_access: IDL.Opt(IDL.Bool),
  });
  const SetAssetContentArguments = IDL.Record({
    key: Key,
    sha256: IDL.Opt(IDL.Vec(IDL.Nat8)),
    chunk_ids: IDL.Vec(ChunkId),
    content_encoding: IDL.Text,
  });
  const BatchOperationKind = IDL.Variant({
    CreateAsset: CreateAssetArguments,
    SetAssetContent: SetAssetContentArguments,
  });
  return IDL.Service({
    create_batch: IDL.Func([], [IDL.Record({ batch_id: BatchId })], []),
    create_chunk: IDL.Func(
      [IDL.Record({ batch_id: BatchId, content: IDL.Vec(IDL.Nat8) })],
      [IDL.Record({ chunk_id: ChunkId })],
      []
    ),
    commit_batch: IDL.Func(
      [IDL.Record({ batch_id: BatchId, operations: IDL.Vec(BatchOperationKind) })],
      [],
      []
    ),
  });
};

async function makeAgent(identity: Identity): Promise<HttpAgent> {
  const agent = new HttpAgent({ host: IC_HOST, identity });
  if (IS_LOCAL) {
    try { await agent.fetchRootKey(); } catch { /* replica may be offline */ }
  }
  return agent;
}

export async function uploadFile(identity: Identity, file: File): Promise<string> {
  if (!UPLOADS_CANISTER_ID) throw new Error("VITE_CANISTER_ID_UPLOADS is not set");

  const agent = await makeAgent(identity);

  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: UPLOADS_CANISTER_ID,
  });

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const key = `/uploads/${fileName}`;

  const buffer = await file.arrayBuffer();
  const content = new Uint8Array(buffer);

  // Step 1: Create batch
  const { batch_id } = await (actor as any).create_batch();

  // Step 2: Upload chunk
  const { chunk_id } = await (actor as any).create_chunk({
    batch_id,
    content: Array.from(content),
  });

  // Step 3: Commit batch
  await (actor as any).commit_batch({
    batch_id,
    operations: [
      { CreateAsset: { key, content_type: file.type, max_age: [], headers: [], enable_aliasing: [], allow_raw_access: [] } },
      { SetAssetContent: { key, sha256: [], chunk_ids: [chunk_id], content_encoding: "identity" } },
    ],
  });

  if (IS_LOCAL) {
    return `http://${UPLOADS_CANISTER_ID}.localhost:4943${key}`;
  }
  return `https://${UPLOADS_CANISTER_ID}.icp0.io${key}`;
}
