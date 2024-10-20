import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.auth.signout)["$post"]
>;

/**
 * @description Hook for signing out
 * @returns Mutation function
 */
export const useSignOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutate = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.signout.$post();

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.clear();
      // queryClient.invalidateQueries({ queryKey: ["current"] });
      // queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
