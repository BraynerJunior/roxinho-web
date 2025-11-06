import { auth } from "@/lib/auth";
import React from "react";

type PrivateLatoutsProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLatoutsProps) {
  const session = await auth();

  if (!session?.user) {
    return <div>Você precisa estar logado</div>;
  }

  return <>{children}</>;
}
