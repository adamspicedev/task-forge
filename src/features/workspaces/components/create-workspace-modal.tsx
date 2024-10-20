"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { useCreateWorkspaceModal } from "../hooks/use-creat-workspace-modal";
import { CreateWorkspaceForm } from "./create-workspace-form";

export function CreateWorkspaceModal() {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
}
