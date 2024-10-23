import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

interface UseGetWorkspaceAnalyticsProps {
  workspaceId: string;
}

export type WorkspaceAnalyticsResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["analytics"]["$get"],
  200
>;

/**
 * @description Hook for getting a workspaces analytics
 * @returns Query function
 */
export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: UseGetWorkspaceAnalyticsProps) => {
  return useQuery({
    queryKey: ["workspaces", workspaceId, "analytics"],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"][
        "analytics"
      ].$get({
        param: {
          workspaceId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get workspace analytics");
      }

      const { data } = await response.json();
      console.log("data", data);
      return data;
    },
  });
};
