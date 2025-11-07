import { getSessionOrThrow } from "@/lib/auth/session";
import React from "react";

type PrivateLatoutsProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLatoutsProps) {
  try {
    await getSessionOrThrow();
  } catch {
    return <div>Você precisa estar logado</div>;
  }

  return <>{children}</>;
}
