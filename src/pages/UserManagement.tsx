import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Plus, Mail, Phone, Building2, Stethoscope, MessageSquare, Settings } from "lucide-react";

export default function UserManagement() {
  const mockUsers = [
    {
      id: "1",
      name: "Dr. Maria Silva",
      email: "maria.silva@petcare.com",
      phone: "(11) 99999-9999",
      role: "VETERINARIAN",
      clinicName: "Clínica Pet Vida",
      status: "Ativo",
      lastLogin: "2 horas atrás",
      appointmentsToday: 8
    },
    {
      id: "2",
      name: "Ana Costa",
      email: "ana.costa@animalcare.com", 
      phone: "(21) 88888-8888",
      role: "RECEPTIONIST",
      clinicName: "Veterinária Animal Care",
      status: "Ativo",
      lastLogin: "1 hora atrás",
      appointmentsToday: 0
    },
    {
      id: "3",
      name: "Dr. João Santos",
      email: "joao.santos@pethealth.com",
      phone: "(31) 77777-7777", 
      role: "VETERINARIAN",
      clinicName: "Pet Health Center",
      status: "Ativo",
      lastLogin: "30 min atrás",
      appointmentsToday: 12
    },
    {
      id: "4",
      name: "Carla Oliveira",
      email: "carla@pethealth.com",
      phone: "(31) 66666-6666",
      role: "RECEPTIONIST", 
      clinicName: "Pet Health Center",
      status: "Ativo",
      lastLogin: "15 min atrás",
      appointmentsToday: 0
    },
    {
      id: "5",
      name: "Dr. Roberto Lima",
      email: "roberto@bemestar.com",
      phone: "(51) 55555-5555",
      role: "VETERINARIAN",
      clinicName: "Clínica Veterinária Bem-Estar", 
      status: "Inativo",
      lastLogin: "3 dias atrás",
      appointmentsToday: 0
    },
    {
      id: "6",
      name: "Paula Souza",
      email: "paula@bemestar.com",
      phone: "(51) 44444-4444",
      role: "CLINIC_ADMIN",
      clinicName: "Clínica Veterinária Bem-Estar",
      status: "Ativo", 
      lastLogin: "1 dia atrás",
      appointmentsToday: 0
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "VETERINARIAN":
        return Stethoscope;
      case "RECEPTIONIST":
        return MessageSquare;
      case "CLINIC_ADMIN":
        return Building2;
      default:
        return Users;
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case "VETERINARIAN":
        return "Veterinário";
      case "RECEPTIONIST":
        return "Recepcionista";
      case "CLINIC_ADMIN":
        return "Admin da Clínica";
      default:
        return "Usuário";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "VETERINARIAN":
        return "bg-success/10 text-success";
      case "RECEPTIONIST":
        return "bg-info/10 text-info";
      case "CLINIC_ADMIN":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout 
      userRole="ADMIN_MASTER" 
      userName="João Silva"
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Usuários Globais</h1>
            <p className="text-muted-foreground">Gerencie todos os usuários da plataforma</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-medium">
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockUsers.map((user) => {
            const RoleIcon = getRoleIcon(user.role);
            return (
              <Card key={user.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {user.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={user.status === "Ativo" ? "default" : "secondary"}
                      className={user.status === "Ativo" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}
                    >
                      {user.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(user.role)}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {getRoleName(user.role)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      {user.clinicName}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {user.phone}
                    </div>
                    {user.role === "VETERINARIAN" && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Stethoscope className="w-4 h-4" />
                        {user.appointmentsToday} consultas hoje
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>Último acesso: {user.lastLogin}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Contatar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}