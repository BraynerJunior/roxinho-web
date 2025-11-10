import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";

export function ProfileContentAccount() {
  return (
    <TabsContent value="account" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Conta</CardTitle>
          <CardDescription>
            Gerencie suas preferências e inscrições.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Status da Conta</Label>
              <p className="text-muted-foreground text-sm">
                Sua conta está ativa
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-green-200 bg-green-50 text-green-700"
            >
              Ativa
            </Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Plano de Inscrição</Label>
              <p className="text-muted-foreground text-sm">
                Plano Pro - $29/mês
              </p>
            </div>
            <Button variant="outline">Gerencie Inscrições</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Visibilidade da Conta</Label>
              <p className="text-muted-foreground text-sm">
                Deixe seu perfil visível para outros
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Exportar Dados</Label>
              <p className="text-muted-foreground text-sm">
                Baixe uma cópia dos seus dados
              </p>
            </div>
            <Button variant="outline">Exporart Dados</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Ações destrutivas e Irreversíveis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Deletar Conta</Label>
              <p className="text-muted-foreground text-sm">
                Deletar permanentemente a sua conta e todos os seus dados
              </p>
            </div>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Deletar Conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
