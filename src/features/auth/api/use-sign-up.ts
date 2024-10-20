import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.signup)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.signup)["$post"]>;

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signup.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current"] });
      router.push("/sign-in");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
