"use client";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { RiAddCircleFill } from "react-icons/ri";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export function WorkspaceSwitcher() {
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkspaceModal();
  const queryClient = useQueryClient();
  const { data: workspaces, isPending } = useGetWorkspaces();
  const router = useRouter();

  const onSelect = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`);
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">WorkSpaces</p>
        <RiAddCircleFill
          onClick={() => open()}
          className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
        />
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 p-1">
          {isPending ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <SelectValue placeholder="No workspace selected" />
          )}
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex items-center justify-start gap-3 font-medium">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.image}
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
