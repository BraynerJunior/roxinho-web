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
import { Key, Shield } from "lucide-react";

export function ProfileContentSecurity() {
  return (
    <TabsContent value="security" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Segurança</CardTitle>
          <CardDescription>
            Gerencie a segurança e autenticação da sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Senha</Label>
                <p className="text-muted-foreground text-sm">
                  Trocado pela última vez 3 meses atrás
                </p>
              </div>
              <Button variant="outline">
                <Key className="mr-2 h-4 w-4" />
                Trocar Senha
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Autenticação em 2 Fatores</Label>
                <p className="text-muted-foreground text-sm">
                  Adicione uma camada extra de segurança para a sua conta
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700"
                >
                  Ativar
                </Badge>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Notificações de Login</Label>
                <p className="text-muted-foreground text-sm">
                  Seja notificado quando alguém entrar na sua conta
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Sessão de Ativos</Label>
                <p className="text-muted-foreground text-sm">
                  Gerencie aparelhos que estão logados a sua conta
                </p>
              </div>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Ver Sessões
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
