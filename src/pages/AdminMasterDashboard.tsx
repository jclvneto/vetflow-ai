import { DashboardLayout } from "@/components/DashboardLayout";
import { WelcomeHero } from "@/components/WelcomeHero";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Calendar, TrendingUp, Plus, Activity } from "lucide-react";

export default function AdminMasterDashboard() {
  const mockData = {
    totalClinics: 24,
    totalUsers: 156,
    totalAppointments: 1248,
    monthlyRevenue: "R$ 45.680",
    recentClinics: [
      { name: "Clínica Pet Vida", location: "São Paulo, SP", users: 8, status: "Ativa" },
      { name: "Veterinária Animal Care", location: "Rio de Janeiro, RJ", users: 5, status: "Ativa" },
      { name: "Pet Health Center", location: "Belo Horizonte, MG", users: 12, status: "Ativa" },
    ]
  };

  return (
    <DashboardLayout 
      userRole="ADMIN_MASTER" 
      userName="João Silva"
    >
      <div className="space-y-8">
        <WelcomeHero userName="João Silva" userRole="ADMIN_MASTER" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Clínicas Ativas"
            value={mockData.totalClinics}
            description="Clínicas cadastradas"
            icon={Building2}
            variant="primary"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Usuários Totais"
            value={mockData.totalUsers}
            description="Veterinários e recepcionistas"
            icon={Users}
            variant="secondary"
            trend={{ value: 12.1, isPositive: true }}
          />
          <StatsCard
            title="Consultas (Mês)"
            value={mockData.totalAppointments}
            description="Agendamentos realizados"
            icon={Calendar}
            variant="success"
            trend={{ value: 15.3, isPositive: true }}
          />
          <StatsCard
            title="Receita Mensal"
            value={mockData.monthlyRevenue}
            description="Faturamento das clínicas"
            icon={TrendingUp}
            variant="warning"
            trend={{ value: 6.8, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Clínicas Recentes
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nova Clínica
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentClinics.map((clinic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{clinic.name}</p>
                        <p className="text-sm text-muted-foreground">{clinic.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{clinic.users} usuários</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                        {clinic.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Atividade do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Consultas hoje</span>
                  <span className="font-medium text-foreground">89</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Mensagens WhatsApp</span>
                  <span className="font-medium text-foreground">245</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Novos usuários</span>
                  <span className="font-medium text-foreground">12</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Taxa de satisfação</span>
                  <span className="font-medium text-success">94.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}