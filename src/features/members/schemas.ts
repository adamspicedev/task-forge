import { z } from "zod";

import { MemberRole } from "./types";

export const getMembersForWorkspaceSchema = z.object({
  workspaceId: z.string(),
});

export const updateMemberSchema = z.object({
  role: z.nativeEnum(MemberRole),
});
