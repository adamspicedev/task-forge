import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

/**
 * @description Hook for getting the current user
 * @returns Query function
 */
export const useCurrent = () => {
  return useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) {
        throw new Error("Failed to get current user");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
