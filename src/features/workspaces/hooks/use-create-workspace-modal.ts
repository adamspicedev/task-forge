import { parseAsBoolean, useQueryState } from "nuqs";

/**
 * @description Hook for creating a workspace modal
 * @returns Modal functions
 */
export function useCreateWorkspaceModal() {
  const [isOpen, setIsOpen] = useQueryState(
    "create-workspace",
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
