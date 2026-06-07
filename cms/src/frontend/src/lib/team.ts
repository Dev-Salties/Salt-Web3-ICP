import { devActor, queryActor } from "./canister";

export type CmsResult = { ok?: null; err?: string };

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  motto: string;
  whyLove: string;
  bestPart: string;
  photoUrl: string;
  order: bigint;
  createdAt: bigint;
  updatedAt: bigint;
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  const actor = await queryActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.getTeamMembers();
}

export async function createTeamMember(member: TeamMember): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.createTeamMember(member);
}

export async function updateTeamMember(member: TeamMember): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.updateTeamMember(member);
}

export async function deleteTeamMember(id: string): Promise<CmsResult> {
  const actor = await devActor();
  if (!actor) throw new Error("Backend actor not available");
  // @ts-ignore
  return await actor.deleteTeamMember(id);
}