import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail } from "lucide-react";

import { formatDateMonthYear } from "@/utils/format-datetime";
import UploadProfilePictureButton from "../upload-profile-picture";

type ProfileHeaderProps = {
  userId: string;
  avatarUrl?: string | null | undefined;
  name?: string | null;
  systemRole?: string | null;
  email?: string | null;
  createdAt?: Date | null | undefined;
  role?: string | null;
};

export default async function ProfileHeader({
  userId,
  avatarUrl,
  createdAt,
  email,
  name,
  systemRole,
  role,
}: ProfileHeaderProps) {
  function systemRoleBadge(systemRole: string | null | undefined) {
    if (systemRole === null || systemRole === undefined) return;

    if (systemRole === "admin") {
      return (
        <Badge
          variant="secondary"
          className="bg-linear-to-tr from-yellow-400 to-yellow-300"
        >
          {systemRole}
        </Badge>
      );
    }

    return <Badge variant="secondary">{systemRole}</Badge>;
  }

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={avatarUrl ?? "/images/default-profile-picture.png"}
                alt="Profile"
              />
              <AvatarFallback className="text-2xl"></AvatarFallback>
            </Avatar>
            <UploadProfilePictureButton userId={userId} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{name}</h1>
              {systemRoleBadge(systemRole)}
            </div>
            <p className="text-muted-foreground capitalize">{role}</p>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {email}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Entrou em {formatDateMonthYear(createdAt)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
