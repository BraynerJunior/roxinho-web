import ProfileHeader from "@/components/profile/profile-header";
import ProfileContent from "@/components/profile/profile-content";
import clsx from "clsx";
import { auth } from "@/lib/auth";
import { findProfileByUserId } from "@/lib/profile/queries";
import { findUserById } from "@/lib/user/queries";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("ID de usuário não encontrado");

  const userId = Number(session.user.id);
  const profile = await findProfileByUserId(userId);
  const user = await findUserById(userId);

  console.log(profile)

  if (!user) throw new Error ("Usuário não encotrado");
  if (!profile) throw new Error("Perfil não encontrado");

  return (
    <div
      className={clsx(
        "w-screen min-h-screen",
        "bg-[url(/images/backgroundhome.svg)] bg-cover"
      )}
    >
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
        <ProfileHeader
          userId={session.user.id}
          avatarUrl={profile.avatarUrl}
          createdAt={user.createdAt}
          email={user.email}
          name={profile.name}
          role={user.role}
          systemRole={user.systemRole}
        />
        <ProfileContent>
          <ProfileContent.Personal
            name={profile.name}
            email={user.email}
            bio={profile.bio}
          />
        </ProfileContent>
      </div>
    </div>
  );
}
