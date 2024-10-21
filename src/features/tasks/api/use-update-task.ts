import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$patch"]
>;

/**
 * @description Hook for updating a task
 * @returns Mutation function
 */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.tasks[":taskId"].$patch({
        json,
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task updated successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("failed to update task");
    },
  });

  return mutate;
};
