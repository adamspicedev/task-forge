import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetWorkspaceProps {
  workspaceId: string;
}

/**
 * @description Hook for getting a workspace
 * @returns Query function
 */
export const useGetWorkspace = ({ workspaceId }: UseGetWorkspaceProps) => {
  return useQuery({
    queryKey: ["workspaces", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"].$get({
        param: {
          workspaceId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get workspace");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
