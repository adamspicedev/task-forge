import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Query } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

import { getMembersForWorkspaceSchema, updateMemberSchema } from "../schemas";
import { Member, MemberRole } from "../types";
import { getMember } from "../utils";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", getMembersForWorkspaceSchema),
    async (c) => {
      const { workspaceId } = c.req.valid("query");
      const databases = c.get("databases");
      const user = c.get("user");
      const { users } = await createAdminClient();

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const members = await databases.listDocuments<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", workspaceId)]
      );

      const populatedMembers = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);
          return {
            ...member,
            name: user.name || user.email,
            email: user.email,
          };
        })
      );

      return c.json({ data: { ...members, documents: populatedMembers } });
    }
  )
  .get("/:workspaceId/:userId", sessionMiddleware, async (c) => {
    const { workspaceId, userId } = c.req.param();
    const databases = c.get("databases");

    const member = await getMember({
      databases,
      workspaceId,
      userId,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json({ data: member });
  })
  .delete("/:memberId", sessionMiddleware, async (c) => {
    const { memberId } = c.req.param();
    const databases = c.get("databases");
    const user = c.get("user");

    const memberToDelete = await databases.getDocument<Member>(
      DATABASE_ID,
      MEMBERS_ID,
      memberId
    );

    const allMembersInWorkSpace = await databases.listDocuments<Member>(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("workspaceId", memberToDelete.workspaceId)]
    );

    const member = await getMember({
      databases,
      workspaceId: memberToDelete.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    if (member.$id !== memberToDelete.$id && member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    if (allMembersInWorkSpace.total === 1) {
      return c.json({ error: "Cannot delete last member" }, 400);
    }

    await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberToDelete.$id);

    return c.json({ data: { $id: memberToDelete.$id } });
  })
  .patch(
    "/:memberId",
    sessionMiddleware,
    zValidator("json", updateMemberSchema),
    async (c) => {
      const { memberId } = c.req.param();
      const { role } = c.req.valid("json");
      const databases = c.get("databases");
      const user = c.get("user");

      const memberToUpdate = await databases.getDocument<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        memberId
      );

      const allMembersInWorkSpace = await databases.listDocuments<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberToUpdate.workspaceId)]
      );

      const member = await getMember({
        databases,
        workspaceId: memberToUpdate.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (
        member.$id !== memberToUpdate.$id &&
        member.role !== MemberRole.ADMIN
      ) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (allMembersInWorkSpace.total === 1) {
        return c.json({ error: "Cannot downgrade last member" }, 400);
      }

      await databases.updateDocument<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        memberToUpdate.$id,
        { role }
      );

      return c.json({ data: { $id: memberToUpdate.$id } });
    }
  );

export default app;
