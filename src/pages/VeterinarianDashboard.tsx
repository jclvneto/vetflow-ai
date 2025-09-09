import { DashboardLayout } from "@/components/DashboardLayout";
import { WelcomeHero } from "@/components/WelcomeHero";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Stethoscope, 
  Clock, 
  Users, 
  Plus,
  FileText,
  AlertCircle
} from "lucide-react";

export default function VeterinarianDashboard() {
  const mockData = {
    todayAppointments: 8,
    pendingRecords: 3,
    completedToday: 5,
    weeklyAverage: "6.2",
    nextAppointments: [
      {
        time: "09:00",
        patient: "Thor",
        owner: "Maria Silva",
        type: "Consulta de rotina",
        status: "confirmed"
      },
      {
        time: "10:30",
        patient: "Luna",
        owner: "Pedro Santos",
        type: "Vacinação",
        status: "pending"
      },
      {
        time: "14:00",
        patient: "Max",
        owner: "Ana Costa",
        type: "Cirurgia menor",
        status: "confirmed"
      },
    ],
    pendingRecordsList: [
      { patient: "Bella", owner: "Carlos Lima", date: "Hoje 08:30" },
      { patient: "Rocky", owner: "Fernanda Oliveira", date: "Hoje 11:45" },
      { patient: "Milo", owner: "Roberto Ferreira", date: "Ontem 16:20" },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout 
      userRole="VETERINARIAN" 
      userName="Dra. Ana Veterinária"
      clinicName="Clínica Pet Vida"
    >
      <div className="space-y-8">
        <WelcomeHero userName="Dra. Ana" userRole="VETERINARIAN" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Consultas Hoje"
            value={mockData.todayAppointments}
            description="Agendamentos confirmados"
            icon={Calendar}
            variant="primary"
          />
          <StatsCard
            title="Prontuários Pendentes"
            value={mockData.pendingRecords}
            description="Aguardando confirmação"
            icon={FileText}
            variant="warning"
          />
          <StatsCard
            title="Concluídas Hoje"
            value={mockData.completedToday}
            description="Consultas finalizadas"
            icon={Stethoscope}
            variant="success"
          />
          <StatsCard
            title="Média Semanal"
            value={mockData.weeklyAverage}
            description="Consultas por dia"
            icon={Clock}
            variant="secondary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Próximos Agendamentos
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.nextAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-smooth">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{appointment.patient}</p>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.owner}</p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Prontuários Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.pendingRecordsList.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{record.patient}</p>
                        <p className="text-sm text-muted-foreground">{record.owner}</p>
                        <p className="text-xs text-warning">{record.date}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="warning">
                      Revisar
                    </Button>
                  </div>
                ))}
              </div>
              {mockData.pendingRecordsList.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum prontuário pendente</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}