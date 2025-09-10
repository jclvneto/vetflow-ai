import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, Database, Bell, Mail, Key, Globe } from "lucide-react";

const AdminSettings = () => {
  return (
    <DashboardLayout userRole="ADMIN_MASTER" userName="João Silva">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Configurações Globais</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie configurações do sistema e preferências globais
          </p>
        </div>

        <div className="grid gap-6">
          {/* Sistema */}
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Database className="w-5 h-5 text-primary" />
                Sistema
              </CardTitle>
              <CardDescription>Configurações gerais do FlowCare</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">Nome do Sistema</Label>
                  <Input id="system-name" defaultValue="FlowCare" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-version">Versão</Label>
                  <Input id="system-version" defaultValue="1.0.0" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-description">Descrição</Label>
                <Textarea 
                  id="system-description" 
                  defaultValue="Sistema de gerenciamento para clínicas veterinárias com prontuário eletrônico e integração WhatsApp"
                />
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                Segurança
              </CardTitle>
              <CardDescription>Configurações de segurança e autenticação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação Dois Fatores (2FA)</Label>
                  <p className="text-sm text-muted-foreground">Obrigatório para todos os usuários</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sessões Simultâneas</Label>
                  <p className="text-sm text-muted-foreground">Permitir múltiplas sessões ativas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                  <Input id="session-timeout" type="number" defaultValue="480" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Política de Senha</Label>
                  <Input id="password-policy" defaultValue="Mínimo 8 caracteres, maiúscula, número" disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integrações */}
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Globe className="w-5 h-5 text-primary" />
                Integrações
              </CardTitle>
              <CardDescription>Configurações de APIs e serviços externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">Chave API OpenAI</Label>
                <div className="flex gap-2">
                  <Input id="openai-key" type="password" defaultValue="sk-***" className="flex-1" />
                  <Button variant="outline" size="sm">
                    <Key className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-token">Token WhatsApp Business</Label>
                <div className="flex gap-2">
                  <Input id="whatsapp-token" type="password" defaultValue="EAAG***" className="flex-1" />
                  <Button variant="outline" size="sm">
                    <Key className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Webhook WhatsApp Ativo</Label>
                  <p className="text-sm text-muted-foreground">Recebimento automático de mensagens</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card className="bg-gradient-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bell className="w-5 h-5 text-primary" />
                Notificações
              </CardTitle>
              <CardDescription>Configurações de alertas e notificações do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas por Email</Label>
                  <p className="text-sm text-muted-foreground">Notificações importantes por email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatórios Automáticos</Label>
                  <p className="text-sm text-muted-foreground">Envio semanal de relatórios</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email do Administrador</Label>
                <Input id="admin-email" type="email" defaultValue="admin@flowcare.com" />
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex gap-3">
            <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-soft">
              Salvar Configurações
            </Button>
            <Button variant="outline">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;