import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function MySchedule() {
  const today = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const mockSchedule = [
    {
      time: "08:00",
      patient: "Thor",
      owner: "Maria Silva",
      type: "Consulta de rotina",
      status: "confirmed",
      room: "Sala 1"
    },
    {
      time: "09:00", 
      patient: "Luna",
      owner: "Pedro Santos",
      type: "Vacinação",
      status: "confirmed",
      room: "Sala 2"
    },
    {
      time: "10:30",
      patient: "Max",
      owner: "Ana Costa",
      type: "Cirurgia menor",
      status: "confirmed",
      room: "Sala Cirúrgica"
    },
    {
      time: "11:30",
      patient: "",
      owner: "",
      type: "Horário livre",
      status: "available",
      room: ""
    },
    {
      time: "14:00",
      patient: "Bella",
      owner: "Carlos Lima", 
      type: "Retorno pós-cirúrgico",
      status: "pending",
      room: "Sala 1"
    },
    {
      time: "15:00",
      patient: "Rocky",
      owner: "Fernanda Oliveira",
      type: "Consulta emergencial",
      status: "urgent",
      room: "Sala 3"
    },
    {
      time: "16:00",
      patient: "",
      owner: "",
      type: "Horário livre",
      status: "available", 
      room: ""
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "urgent":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "available":
        return "bg-muted/50 text-muted-foreground border-muted";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendente";
      case "urgent":
        return "Urgente";
      case "available":
        return "Disponível";
      default:
        return status;
    }
  };

  return (
    <DashboardLayout 
      userRole="VETERINARIAN" 
      userName="Dra. Ana Veterinária"
      clinicName="Clínica Pet Vida"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Minha Agenda</h1>
            <p className="text-muted-foreground capitalize">{today}</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </Button>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Agenda do Dia
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSchedule.map((appointment, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border transition-smooth hover:shadow-soft ${
                    appointment.status === 'available' 
                      ? 'border-dashed border-muted hover:border-primary/50 hover:bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-center">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                          <Clock className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <p className="text-sm font-semibold text-primary mt-1">
                          {appointment.time}
                        </p>
                      </div>
                      
                      <div className="flex-1">
                        {appointment.status === 'available' ? (
                          <div className="text-center py-4">
                            <p className="text-muted-foreground">Horário disponível para agendamento</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Agendar Consulta
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {appointment.patient}
                              </h3>
                              <Badge className={getStatusColor(appointment.status)}>
                                {getStatusText(appointment.status)}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{appointment.owner}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{appointment.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{appointment.room}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {appointment.status !== 'available' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                        {appointment.status === 'confirmed' && (
                          <Button size="sm">
                            Iniciar Consulta
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}