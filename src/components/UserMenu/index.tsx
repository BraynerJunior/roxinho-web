"use client";

import { useTransition } from "react";
import Link from "next/link";
import { logoutAction } from "@/actions/auth/logout";
import type { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

type UserMenuProps = {
  user: Session["user"];
};

export function UserMenu({ user }: UserMenuProps) {
  const currentPath = usePathname();

  let onDashboard = false;
  if (currentPath.includes("/dashboard")) onDashboard = true;

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logoutAction();
    });
  };

  if (!user) return;
  const fallbackLetter =
    user.name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "?";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-full">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || ""} alt={user.name || ""} />
              <AvatarFallback>{fallbackLetter}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 bg-violet-eggplant-100"
          align="end"
          side="top"
          sideOffset={12}
        >
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="hover:bg-violet-eggplant-400" asChild>
            <Link href="/profile">Perfil</Link>
          </DropdownMenuItem>

          {user.role === "admin" && !onDashboard && (
            <DropdownMenuItem className="hover:bg-violet-eggplant-400" asChild>
              <Link href="/dashboard">Painel Administrador</Link>
            </DropdownMenuItem>
          )}

          {user.role === "admin" && onDashboard && (
            <DropdownMenuItem className="hover:bg-violet-eggplant-400" asChild>
              <Link href="/home">Início</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isPending}
            className="hover:bg-violet-eggplant-400"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
