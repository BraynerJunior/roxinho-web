import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type PrivateLatoutsProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLatoutsProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <div>{children}</div>;
}
