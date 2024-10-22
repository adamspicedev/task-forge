import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChevronRight, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

import { useDeleteTask } from "../api/use-delete-task";
import { Task } from "../types";

interface TaskBreadcrumbsProps {
  project?: Project;
  task?: Task;
}

export function TaskBreadcrumbs({ project, task }: TaskBreadcrumbsProps) {
  const workspaceId = useWorkspaceId();
  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task?",
    "destructive"
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    deleteTask(
      { param: { taskId: task?.$id as string } },
      {
        onSuccess: () => router.push(`/workspaces/${workspaceId}/tasks`),
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <ConfirmDialog />
      {project && (
        <ProjectAvatar
          name={project.name}
          image={project.image}
          className="size-6 lg:size-8"
        />
      )}
      <Link href={`/workspaces/${workspaceId}/projects/${project?.$id}`}>
        <p className="text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg">
          {project?.name}
        </p>
      </Link>
      <ChevronRight className="size-4 text-muted-foreground lg:size-5" />
      <p className="text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg">
        {task?.name}
      </p>
      <Button
        disabled={isDeletingTask}
        variant="destructive"
        size="sm"
        className="ml-auto"
        onClick={handleDeleteTask}
      >
        <Trash className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete task</span>
      </Button>
    </div>
  );
}
