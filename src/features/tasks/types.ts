import { Models } from "node-appwrite";

import { Member } from "../members/types";
import { Project } from "../projects/types";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export type Task = Models.Document & {
  name: string;
  status: TaskStatus;
  assigneeId: string;
  projectId: string;
  position: number;
  description: string;
  dueDate: string;
  workspaceId: string;
};

export interface PopulatedTask extends Task {
  project?: Project;
  assignee?: Member;
}

export type TaskPayload = {
  $id: string;
  status: TaskStatus;
  position: number;
};
