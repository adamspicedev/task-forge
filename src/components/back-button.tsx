"use client";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "lucide-react";

import { Button } from "./ui/button";

export function BackButton({
  onCancel,
  workSpaceId,
}: {
  onCancel?: () => void;
  workSpaceId: string;
}) {
  const router = useRouter();

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={
        onCancel ? onCancel : () => router.push(`/workspaces/${workSpaceId}`)
      }
    >
      <ArrowLeftIcon className="mr-2 size-4" />
      Back
    </Button>
  );
}
