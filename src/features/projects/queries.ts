import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";

import { getMember } from "../members/utils";
import { Project } from "./types";

interface GetProjectProps {
  projectId: string;
}

/**
 * @description Gets workspaces for the current user
 * @returns Workspaces
 */
export async function getProject({ projectId }: GetProjectProps) {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    workspaceId: project.workspaceId,
    userId: user.$id,
  });

  if (!member) throw new Error("Unauthorized");

  return project;
}
