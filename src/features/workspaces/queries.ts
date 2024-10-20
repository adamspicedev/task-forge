"use server";

import { Query } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";

import { getMember } from "../members/utils";
import { Workspace } from "./types";

/**
 * @description Gets workspaces for the current user
 * @returns Workspaces
 */
export async function getWorkspaces() {
  try {
    const { account, databases } = await createSessionClient();

    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) return { documents: [], total: 0 };

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );

    return workspaces;
  } catch (_error) {
    return { documents: [], total: 0 };
  }
}

/**
 * @description Gets a workspace by ID
 * @param workspaceId - Workspace ID
 * @returns Workspace
 */
export async function getWorkspace(workspaceId: string) {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const member = await getMember(databases, workspaceId, user.$id);

    if (!member) return null;

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return workspace;
  } catch (_error) {
    return null;
  }
}

/**
 * @description Gets a workspace's info by ID
 * @param workspaceId - Workspace ID
 * @returns Workspace info
 */
export async function getWorkspaceInfo(workspaceId: string) {
  try {
    const { databases } = await createSessionClient();

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return { name: workspace.name };
  } catch (_error) {
    return null;
  }
}
