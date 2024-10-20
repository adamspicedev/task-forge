import { type Databases, Query } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID } from "@/config";

/**
 * @description Gets a member from the database
 * @param databases - Appwrite databases
 * @param workspaceId - Workspace ID
 * @param userId - User ID
 * @returns Member
 */
export const getMember = async (
  databases: Databases,
  workspaceId: string,
  userId: string
) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("workspaceId", workspaceId),
    Query.equal("userId", userId),
  ]);
  return members.documents[0];
};
