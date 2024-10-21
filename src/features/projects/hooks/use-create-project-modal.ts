import { parseAsBoolean, useQueryState } from "nuqs";

/**
 * @description Hook for creating a project modal
 * @returns Modal functions
 */
export function useCreateProjectModal() {
  const [isOpen, setIsOpen] = useQueryState(
    "create-project",
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
