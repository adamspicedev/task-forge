import { useRouter } from "next/navigation";

import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

import { useDeleteTask } from "../api/use-delete-task";
import { useUpdateTaskModal } from "../hooks/use-update-task-modal";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export function TaskActions({ id, projectId, children }: TaskActionsProps) {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { open } = useUpdateTaskModal();
  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task?",
    "destructive"
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (ok) deleteTask({ param: { taskId: id } });
  };

  const openTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const openProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={openTask} className="p-3 font-medium">
            <ExternalLinkIcon className="mr-2 size-2 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openProject} className="p-3 font-medium">
            <ExternalLinkIcon className="mr-2 size-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            className="p-3 font-medium"
          >
            <PencilIcon className="mr-2 size-2 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2 border-t border-muted" />
          <DropdownMenuItem
            onClick={handleDeleteTask}
            disabled={isDeletingTask}
            className="p-3 font-medium text-red-700 focus:text-red-700"
          >
            <TrashIcon className="mr-2 size-2 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
