import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetProjectsProps {
  workspaceId: string;
}

/**
 * @description Hook for getting workspaces
 * @returns Query function
 */
export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: {
          workspaceId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get projects");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
