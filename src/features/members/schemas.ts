import { z } from "zod";

import { MemberRole } from "./types";

/**
 * @description Schema for getting members for a workspace
 * @example
 * ```ts
 * const data = getMembersForWorkspaceSchema.parse({
 *  workspaceId: "123",
 * });
 * ```
 */
export const getMembersForWorkspaceSchema = z.object({
  workspaceId: z.string(),
});

/**
 * @description Schema for updating a member
 * @example
 * ```ts
 * const data = updateMemberSchema.parse({
 *  role: "ADMIN",
 * });
 * ```
 */
export const updateMemberSchema = z.object({
  role: z.nativeEnum(MemberRole),
});
