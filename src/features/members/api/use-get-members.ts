import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

/**
 * @description Hook for getting members for a workspace
 * @param workspaceId - Workspace ID
 * @returns Query function
 */
export const useGetMembers = (workspaceId: string) => {
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to get members");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
