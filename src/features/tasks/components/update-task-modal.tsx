"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useUpdateTaskModal } from "@/features/tasks/hooks/use-update-task-modal";

import { UpdateTaskFormWrapper } from "./update-task-form-wrapper";

export function UpdateTaskModal() {
  const { taskId, close } = useUpdateTaskModal();
  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <UpdateTaskFormWrapper onCancel={close} id={taskId} />}
    </ResponsiveModal>
  );
}
