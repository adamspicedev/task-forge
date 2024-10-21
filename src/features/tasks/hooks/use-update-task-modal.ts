import { parseAsString, useQueryState } from "nuqs";

/**
 * @description Hook for updating a task modal
 * @returns Modal functions
 */
export function useUpdateTaskModal() {
  const [taskId, setTaskId] = useQueryState("update-task", parseAsString);

  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);

  return {
    taskId,
    open,
    close,
    setTaskId,
  };
}
