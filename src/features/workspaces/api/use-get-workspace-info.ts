import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetWorkspaceInfoProps {
  workspaceId: string;
}

/**
 * @description Hook for getting a workspace's info
 * @returns Query function
 */
export const useGetWorkspaceInfo = ({
  workspaceId,
}: UseGetWorkspaceInfoProps) => {
  return useQuery({
    queryKey: ["workspaces", workspaceId, "info"],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"].info.$get({
        param: {
          workspaceId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get workspace info");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
