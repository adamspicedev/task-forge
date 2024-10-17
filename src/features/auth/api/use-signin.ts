import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.signin)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.signin)["$post"]>;

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signin.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.refresh();
    },
  });

  return mutate;
};
