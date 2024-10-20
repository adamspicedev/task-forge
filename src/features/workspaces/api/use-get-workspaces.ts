import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

/**
 * @description Hook for getting workspaces
 * @returns Query function
 */
export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) {
        throw new Error("Failed to get workspaces");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
