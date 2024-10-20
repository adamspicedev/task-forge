import { useParams } from "next/navigation";

/**
 * @description Hook for getting the invite code from the URL
 * @returns Invite code
 */
export function useInviteCode() {
  const params = useParams();
  return params.inviteCode as string;
}
