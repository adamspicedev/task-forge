import { z } from "zod";

import { TaskStatus } from "./types";

/**
 * @description Schema for getting tasks
 * @example
 * ```ts
 * const data = getTasksSchema.parse({
 *  workspaceId: "123",
 *  projectId: "123",
 *  assigneeId: "123",
 *  status: TaskStatus.TODO,
 *  search: "task name",
 *  dueDate: "2024-01-01",
 * });
 * ```
 */
export const getTasksSchema = z.object({
  workspaceId: z.string(),
  projectId: z.string().nullish(),
  assigneeId: z.string().nullish(),
  status: z.nativeEnum(TaskStatus).nullish(),
  search: z.string().nullish(),
  dueDate: z.string().nullish(),
});

/**
 * @description Schema for creating a task
 */
export const createTaskSchema = z.object({
  name: z.string().trim().min(1, { message: "Task name is required" }),
  status: z.nativeEnum(TaskStatus, {
    required_error: "Task status is required",
  }),
  projectId: z.string().trim().min(1, { message: "Project ID is required" }),
  workspaceId: z
    .string()
    .trim()
    .min(1, { message: "Workspace ID is required" }),
  assigneeId: z.string().trim().min(1, { message: "Assignee ID is required" }),
  description: z.string().trim().optional(),
  dueDate: z.coerce.date(),
});
