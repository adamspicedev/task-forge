import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface UseGetProjectProps {
  projectId: string;
}

/**
 * @description Hook for getting a project
 * @returns Query function
 */
export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"].$get({
        param: {
          projectId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get project");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
