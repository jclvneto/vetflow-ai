import { DashboardLayout } from "@/components/DashboardLayout";
import { WelcomeHero } from "@/components/WelcomeHero";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Calendar, 
  Users, 
  Clock,
  Phone,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function ReceptionistDashboard() {
  const mockData = {
    pendingMessages: 12,
    todayAppointments: 23,
    pendingConfirmations: 5,
    avgResponseTime: "2.3min",
    whatsappQueue: [
      {
        id: 1,
        contact: "Maria Silva",
        message: "Gostaria de agendar uma consulta para o Thor",
        time: "2 min atrás",
        status: "new"
      },
      {
        id: 2,
        contact: "Pedro Santos",
        message: "Preciso remarcar a consulta de amanhã",
        time: "5 min atrás",
        status: "pending"
      },
      {
        id: 3,
        contact: "Ana Costa",
        message: "Quanto custa uma castração?",
        time: "8 min atrás",
        status: "faq"
      },
    ],
    todaySchedule: [
      { time: "09:00", patient: "Thor", owner: "Maria Silva", vet: "Dra. Ana", status: "confirmed" },
      { time: "10:30", patient: "Luna", owner: "Pedro Santos", vet: "Dr. Carlos", status: "pending" },
      { time: "14:00", patient: "Max", owner: "Ana Costa", vet: "Dra. Ana", status: "confirmed" },
      { time: "15:30", patient: "Bella", owner: "João Lima", vet: "Dr. Carlos", status: "pending" },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "new":
        return "bg-info/10 text-info";
      case "faq":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "new":
        return "Nova";
      case "pending":
        return "Pendente";
      case "faq":
        return "FAQ";
      default:
        return status;
    }
  };

  const getAppointmentStatus = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  return (
    <DashboardLayout 
      userRole="RECEPTIONIST" 
      userName="Carla Recepção"
      clinicName="Clínica Pet Vida"
    >
      <div className="space-y-8">
        <WelcomeHero userName="Carla" userRole="RECEPTIONIST" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Mensagens Pendentes"
            value={mockData.pendingMessages}
            description="WhatsApp não respondidas"
            icon={MessageSquare}
            variant="warning"
          />
          <StatsCard
            title="Consultas Hoje"
            value={mockData.todayAppointments}
            description="Agendamentos do dia"
            icon={Calendar}
            variant="primary"
          />
          <StatsCard
            title="Confirmações Pendentes"
            value={mockData.pendingConfirmations}
            description="Aguardando confirmação"
            icon={Clock}
            variant="info"
          />
          <StatsCard
            title="Tempo Médio Resposta"
            value={mockData.avgResponseTime}
            description="WhatsApp"
            icon={CheckCircle}
            variant="success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Fila WhatsApp
              </CardTitle>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Abrir WhatsApp
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.whatsappQueue.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-smooth">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-foreground">{item.contact}</p>
                        <Badge className={getStatusColor(item.status)}>
                          {getMessageStatus(item.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.message}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      Responder
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Agenda de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.todaySchedule.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-primary">{appointment.time}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{appointment.patient}</p>
                          <Badge className={getStatusColor(appointment.status)}>
                            {getAppointmentStatus(appointment.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.owner}</p>
                        <p className="text-sm text-muted-foreground">{appointment.vet}</p>
                      </div>
                    </div>
                    {appointment.status === "pending" && (
                      <Button size="sm" variant="outline">
                        Confirmar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}