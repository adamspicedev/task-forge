import { AlertTriangle } from "lucide-react";

interface PageErrorProps {
  message: string;
}

export function PageError({
  message = "Something went wrong",
}: PageErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <AlertTriangle className="mb-2 size-6 text-destructive" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
