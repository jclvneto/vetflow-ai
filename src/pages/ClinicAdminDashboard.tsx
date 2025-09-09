import { DashboardLayout } from "@/components/DashboardLayout";
import { WelcomeHero } from "@/components/WelcomeHero";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Star,
  Plus,
  Settings
} from "lucide-react";

export default function ClinicAdminDashboard() {
  const mockData = {
    monthlyAppointments: 342,
    activeStaff: 6,
    monthlyRevenue: "R$ 18.500",
    satisfactionScore: 4.8,
    recentActivity: [
      { type: "appointment", message: "Nova consulta agendada - Thor (Maria Silva)", time: "5 min atrás" },
      { type: "staff", message: "Dr. Carlos adicionou prontuário", time: "12 min atrás" },
      { type: "whatsapp", message: "3 novas mensagens no WhatsApp", time: "18 min atrás" },
      { type: "feedback", message: "Avaliação 5 estrelas recebida", time: "1h atrás" },
    ],
    staffMembers: [
      { name: "Dra. Ana Veterinária", role: "Veterinária", status: "online", patients: 12 },
      { name: "Dr. Carlos Santos", role: "Veterinário", status: "busy", patients: 8 },
      { name: "Carla Recepção", role: "Recepcionista", status: "online", patients: 0 },
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return Calendar;
      case "staff":
        return Users;
      case "whatsapp":
        return MessageSquare;
      case "feedback":
        return Star;
      default:
        return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success/10 text-success";
      case "busy":
        return "bg-warning/10 text-warning";
      case "offline":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout 
      userRole="CLINIC_ADMIN" 
      userName="Dr. Roberto Silva"
      clinicName="Clínica Pet Vida"
    >
      <div className="space-y-8">
        <WelcomeHero userName="Dr. Roberto" userRole="CLINIC_ADMIN" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Consultas (Mês)"
            value={mockData.monthlyAppointments}
            description="Agendamentos realizados"
            icon={Calendar}
            variant="primary"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Equipe Ativa"
            value={mockData.activeStaff}
            description="Veterinários e recepcionistas"
            icon={Users}
            variant="secondary"
          />
          <StatsCard
            title="Receita Mensal"
            value={mockData.monthlyRevenue}
            description="Faturamento da clínica"
            icon={TrendingUp}
            variant="success"
            trend={{ value: 8.3, isPositive: true }}
          />
          <StatsCard
            title="Satisfação"
            value={`${mockData.satisfactionScore}/5`}
            description="Avaliação média dos clientes"
            icon={Star}
            variant="warning"
            trend={{ value: 2.1, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Equipe da Clínica
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Membro
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.staffMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{member.name}</p>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status === "online" ? "Online" : member.status === "busy" ? "Ocupado" : "Offline"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {member.patients > 0 && (
                        <p className="text-sm text-muted-foreground">{member.patients} pacientes hoje</p>
                      )}
                      <Button size="sm" variant="ghost">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}