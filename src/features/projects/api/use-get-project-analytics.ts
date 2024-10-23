import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

interface UseGetProjectAnalyticsProps {
  projectId: string;
}

export type ProjectAnalyticsResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;

/**
 * @description Hook for getting a projects analytics
 * @returns Query function
 */
export const useGetProjectAnalytics = ({
  projectId,
}: UseGetProjectAnalyticsProps) => {
  return useQuery({
    queryKey: ["projects", projectId, "analytics"],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"][
        "analytics"
      ].$get({
        param: {
          projectId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get project analytics");
      }

      const { data } = await response.json();
      console.log("data", data);
      return data;
    },
  });
};
