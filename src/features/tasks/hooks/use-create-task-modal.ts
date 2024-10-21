import { parseAsBoolean, useQueryState } from "nuqs";

/**
 * @description Hook for creating a task modal
 * @returns Modal functions
 */
export function useCreateTaskModal() {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
}
