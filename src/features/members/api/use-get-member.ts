import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetMemberProps {
  workspaceId: string;
  userId: string;
}

/**
 * @description Hook for getting member for a workspace
 * @param workspaceId - Workspace ID
 * @param userId - User ID
 * @returns Query function
 */
export const useGetMember = ({ workspaceId, userId }: UseGetMemberProps) => {
  return useQuery({
    queryKey: ["members", workspaceId, userId],
    queryFn: async () => {
      const response = await client.api.members[":workspaceId"][":userId"].$get(
        {
          param: { workspaceId, userId },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get member");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
