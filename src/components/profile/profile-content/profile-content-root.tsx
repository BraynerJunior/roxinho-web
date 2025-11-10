// ProfileContent.tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

type ProfileContentRootProps = {
  children: ReactNode;
  defaultTab?: string;
};

export function ProfileContentRoot({
  children,
  defaultTab = "personal",
}: ProfileContentRootProps) {
  return (
    <Tabs defaultValue={defaultTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Pessoal</TabsTrigger>
        <TabsTrigger disabled value="account">Conta</TabsTrigger>
        <TabsTrigger disabled value="security">Segurança</TabsTrigger>
        <TabsTrigger disabled value="notifications">Notificações</TabsTrigger>
      </TabsList>

      {children}
    </Tabs>
  );
}
