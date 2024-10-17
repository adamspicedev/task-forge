"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useSignout } from "@/features/auth/api/use-signout";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useSignout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return (
    <div className="flex gap-4">
      <Button onClick={() => mutate()}>Sign Out</Button>
    </div>
  );
}
