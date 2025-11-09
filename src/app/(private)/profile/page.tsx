import ProfileHeader from "@/components/profile/profile-header";
import ProfileContent from "@/components/profile/profile-content";
import clsx from "clsx";
import { auth } from "@/lib/auth";
import { findUserById } from "@/lib/user/queries";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("ID de usuário não encontrado");
  const id = Number(session?.user?.id);
  if (!session?.user?.id || isNaN(id))
    throw new Error("ID de usuário inválido");
  const user = await findUserById(id);
  if (!user) throw new Error("Usuário não encontrado");

  return (
    <div
      className={clsx(
        "w-screen min-h-screen",
        "bg-[url(/images/backgroundhome.svg)] bg-cover"
      )}
    >
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
        <ProfileHeader
          avatarUrl={user.avatarUrl}
          createdAt={user.createdAt}
          email={user.email}
          name={user.name}
          role={user.role}
          systemRole={user.systemRole}
        />
        <ProfileContent name={user.name} email={user.email} bio={user.bio} />
      </div>
    </div>
  );
}
