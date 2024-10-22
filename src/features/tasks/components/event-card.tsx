import { useRouter } from "next/navigation";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Member } from "@/features/members/types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

import { TaskStatus } from "../types";

const statusColorsMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-400",
  [TaskStatus.TODO]: "border-l-red-400",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-400",
  [TaskStatus.IN_REVIEW]: "border-l-blue-400",
  [TaskStatus.DONE]: "border-l-emerald-400",
};

interface EventCardProps {
  id: string;
  title: string;
  assignee: Member;
  project: Project;
  status: TaskStatus;
}

export function EventCard({
  id,
  title,
  assignee,
  project,
  status,
}: EventCardProps) {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "flex cursor-pointer flex-col gap-y-1.5 rounded-md border border-l-4 bg-white p-1.5 text-sm text-primary transition hover:opacity-75",
          statusColorsMap[status]
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar name={assignee?.name} />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar name={project?.name} image={project?.image} />
        </div>
      </div>
    </div>
  );
}
