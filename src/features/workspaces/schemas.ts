import { z } from "zod";

/**
 * @description Schema for creating a workspace
 * @example
 * ```ts
 * const data = createWorkspaceSchema.parse({
 *  name: "New Workspace",
 *  image: new File([], "image.png"),
 * });
 * ```
 */
export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, { message: "Workspace name is required" }),
  image: z.union([
    z.instanceof(File),
    z
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
  ]),
});

/**
 * @description Schema for updating a workspace
 * @example
 * ```ts
 * const data = updateWorkspaceSchema.parse({
 *  name: "New Workspace",
 *  image: new File([], "image.png"),
 * });
 * ```
 */
export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Must be 1 or more characters" })
    .optional(),
  image: z.union([
    z.instanceof(File),
    z
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
  ]),
});

/**
 * @description Schema for joining a workspace
 * @example
 * ```ts
 * const data = joinWorkspaceSchema.parse({
 *  code: "123",
 * });
 * ```
 */
export const joinWorkspaceSchema = z.object({
  code: z.string().trim().min(1, { message: "Invite code is required" }),
});
