"use client";

import { logoutAction } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
    >
      {isPending ? "Saindo..." : "Sair"}
    </Button>
  );
}
