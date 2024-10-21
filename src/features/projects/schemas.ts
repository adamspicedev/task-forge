import { z } from "zod";

/**
 * @description Schema for getting projects
 * @example
 * ```ts
 * const data = getProjectsSchema.parse({
 *  workspaceId: "123",
 * });
 * ```
 */
export const getProjectsSchema = z.object({
  workspaceId: z.string(),
});

/**
 * @description Schema for creating a project
 * @example
 * ```ts
 * const data = createProjectSchema.parse({
 *  name: "New Project",
 *  image: new File([], "image.png"),
 *  workspaceId: "123",
 * });
 * ```
 */
export const createProjectSchema = z.object({
  name: z.string().trim().min(1, { message: "Project name is required" }),
  image: z.union([
    z.instanceof(File),
    z
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
  ]),
  workspaceId: z.string(),
});

/**
 * @description Schema for updating a project
 * @example
 * ```ts
 * const data = createProjectSchema.parse({
 *  name: "New Project",
 *  image: new File([], "image.png"),
 *  workspaceId: "123",
 * });
 * ```
 */
export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, { message: "Minimum length is 1" }).optional(),
  image: z.union([
    z.instanceof(File),
    z
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
  ]),
});
