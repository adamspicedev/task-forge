import { Loader } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-4">
      <Loader className="size-12 animate-spin text-muted-foreground" />
    </div>
  );
}
