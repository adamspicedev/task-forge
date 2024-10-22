import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { TaskStatus } from "../types";
import { toPrettyTaskStatus } from "../utils";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: <CircleDashedIcon className="size-5 text-pink-500" />,
  [TaskStatus.TODO]: <CircleIcon className="size-5 text-red-500" />,
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size-5 text-yellow-500" />
  ),
  [TaskStatus.IN_REVIEW]: <CircleDotIcon className="size-5 text-blue-500" />,
  [TaskStatus.DONE]: <CircleCheckIcon className="size-5 text-emerald-500" />,
};

export function KanbanColumnHeader({
  board,
  taskCount,
}: KanbanColumnHeaderProps) {
  const icon = statusIconMap[board];
  const { open } = useCreateTaskModal();
  return (
    <div className="flex items-center justify-between px-2 py-1.5">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">{toPrettyTaskStatus(board)}</h2>
        <div className="flex size-5 items-center justify-center rounded-md bg-neutral-200 text-xs font-medium text-neutral-700">
          {taskCount}
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={open} className="s-5">
        <PlusIcon className="s-4 text-neutral-500" />
      </Button>
    </div>
  );
}
