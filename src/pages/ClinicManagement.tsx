import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, MapPin, Users, Activity, Settings } from "lucide-react";

export default function ClinicManagement() {
  const mockClinics = [
    {
      id: "1",
      name: "Clínica Pet Vida",
      legalName: "Pet Vida Veterinária LTDA",
      location: "São Paulo, SP",
      whatsappNumber: "(11) 99999-9999",
      users: 8,
      status: "Ativa",
      appointments: 45,
      lastActivity: "2 horas atrás"
    },
    {
      id: "2", 
      name: "Veterinária Animal Care",
      legalName: "Animal Care Serviços Veterinários S/A",
      location: "Rio de Janeiro, RJ",
      whatsappNumber: "(21) 88888-8888",
      users: 5,
      status: "Ativa",
      appointments: 32,
      lastActivity: "1 hora atrás"
    },
    {
      id: "3",
      name: "Pet Health Center", 
      legalName: "Pet Health Center Medicina Veterinária LTDA",
      location: "Belo Horizonte, MG",
      whatsappNumber: "(31) 77777-7777",
      users: 12,
      status: "Ativa",
      appointments: 67,
      lastActivity: "30 min atrás"
    },
    {
      id: "4",
      name: "Clínica Veterinária Bem-Estar",
      legalName: "Bem-Estar Animal LTDA",
      location: "Porto Alegre, RS",
      whatsappNumber: "(51) 66666-6666", 
      users: 6,
      status: "Inativa",
      appointments: 0,
      lastActivity: "3 dias atrás"
    }
  ];

  return (
    <DashboardLayout 
      userRole="ADMIN_MASTER" 
      userName="João Silva"
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Clínicas</h1>
            <p className="text-muted-foreground">Gerencie todas as clínicas da plataforma</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-medium">
            <Plus className="w-4 h-4 mr-2" />
            Nova Clínica
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockClinics.map((clinic) => (
            <Card key={clinic.id} className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {clinic.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{clinic.legalName}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={clinic.status === "Ativa" ? "default" : "secondary"}
                    className={clinic.status === "Ativa" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}
                  >
                    {clinic.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {clinic.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {clinic.users} usuários ativos
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="w-4 h-4" />
                    {clinic.appointments} consultas este mês
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>Última atividade: {clinic.lastActivity}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}