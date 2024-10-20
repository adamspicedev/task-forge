import { useParams } from "next/navigation";

/**
 * @description Hook for getting the workspace ID from the URL
 * @returns Workspace ID
 */
export function useWorkspaceId() {
  const params = useParams();
  return params.workspaceId as string;
}
