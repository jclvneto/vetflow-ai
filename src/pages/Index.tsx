import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint, Shield, Calendar, Stethoscope, MessageSquare } from "lucide-react";
import heroImage from "@/assets/vet-hero.jpg";
import AdminMasterDashboard from "./AdminMasterDashboard";
import ClinicAdminDashboard from "./ClinicAdminDashboard";
import ReceptionistDashboard from "./ReceptionistDashboard";
import VeterinarianDashboard from "./VeterinarianDashboard";

type UserRole = "ADMIN_MASTER" | "CLINIC_ADMIN" | "RECEPTIONIST" | "VETERINARIAN" | null;

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  if (selectedRole === "ADMIN_MASTER") {
    return <AdminMasterDashboard />;
  }

  if (selectedRole === "CLINIC_ADMIN") {
    return <ClinicAdminDashboard />;
  }

  if (selectedRole === "RECEPTIONIST") {
    return <ReceptionistDashboard />;
  }

  if (selectedRole === "VETERINARIAN") {
    return <VeterinarianDashboard />;
  }

  const roles = [
    {
      role: "ADMIN_MASTER" as const,
      title: "Administrador Master",
      description: "Controle total sobre todas as clínicas e usuários da plataforma",
      icon: Shield,
      features: ["Gestão de múltiplas clínicas", "Dashboard global", "Controle de usuários"],
      color: "primary"
    },
    {
      role: "CLINIC_ADMIN" as const,
      title: "Admin da Clínica",
      description: "Gerencie sua clínica e equipe com dashboard completo",
      icon: PawPrint,
      features: ["Dashboard da clínica", "Gestão de equipe", "Relatórios e KPIs"],
      color: "secondary"
    },
    {
      role: "RECEPTIONIST" as const,
      title: "Recepcionista",
      description: "Gerencie agendamentos e atendimento via WhatsApp",
      icon: MessageSquare,
      features: ["Agenda da clínica", "WhatsApp integrado", "Gestão de clientes"],
      color: "info"
    },
    {
      role: "VETERINARIAN" as const,
      title: "Veterinário(a)",
      description: "Prontuários inteligentes com IA e agenda pessoal",
      icon: Stethoscope,
      features: ["Prontuário com IA", "Agenda pessoal", "Histórico de pacientes"],
      color: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative px-6 py-20 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white">
                FlowCare
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-white/90 mb-4">
              CRM SaaS para Clínicas Veterinárias
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">
              Digitalização do atendimento com IA, agendamento via WhatsApp e comunicação automatizada. 
              Reduza tempo administrativo e aumente a satisfação dos clientes.
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Selecione seu Perfil de Acesso
            </h2>
            <p className="text-lg text-muted-foreground">
              Cada perfil tem funcionalidades específicas para otimizar seu trabalho
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((roleData) => {
              const Icon = roleData.icon;
              return (
                <Card 
                  key={roleData.role}
                  className="shadow-soft hover:shadow-strong transition-smooth cursor-pointer group hover:scale-105"
                  onClick={() => setSelectedRole(roleData.role)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-${roleData.color === 'primary' ? 'primary' : roleData.color === 'secondary' ? 'secondary' : 'primary'}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {roleData.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6">
                      {roleData.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {roleData.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={() => setSelectedRole(roleData.role)}
                    >
                      Acessar como {roleData.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
