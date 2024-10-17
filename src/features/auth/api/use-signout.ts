import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.auth.signout)["$post"]
>;

export const useSignout = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.signout.$post();
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
  });

  return mutate;
};
