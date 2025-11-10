// ProfileContentPersonal.tsx
import { TabsContent } from "@/components/ui/tabs";
import { ProfileForm } from "./form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProfilePersonalProps = {
  name?: string | null;
  email?: string | null;
  bio?: string | null;
};

export function ProfileContentPersonal({
  name,
  email,
  bio,
}: ProfilePersonalProps) {
  return (
    <TabsContent value="personal" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize seus detalhes pessoais e informações de perfil.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <ProfileForm name={name ?? ""} email={email ?? ""} bio={bio ?? ""} />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
