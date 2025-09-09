import { Button } from "@/components/ui/button";
import { Heart, PawPrint, Stethoscope } from "lucide-react";
import heroImage from "@/assets/vet-hero.jpg";

interface WelcomeHeroProps {
  userName: string;
  userRole: "ADMIN_MASTER" | "CLINIC_ADMIN" | "RECEPTIONIST" | "VETERINARIAN";
}

export const WelcomeHero = ({ userName, userRole }: WelcomeHeroProps) => {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "ADMIN_MASTER":
        return "Administrador Master";
      case "CLINIC_ADMIN":
        return "Administrador da Clínica";
      case "RECEPTIONIST":
        return "Recepcionista";
      case "VETERINARIAN":
        return "Veterinário(a)";
      default:
        return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "VETERINARIAN":
        return Stethoscope;
      case "RECEPTIONIST":
        return Heart;
      default:
        return PawPrint;
    }
  };

  const RoleIcon = getRoleIcon(userRole);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-hero shadow-strong">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="relative px-8 py-12 lg:px-12 lg:py-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <RoleIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Bem-vindo, {userName}!
              </h1>
              <p className="text-white/90 text-lg">
                {getRoleDisplayName(userRole)}
              </p>
            </div>
          </div>
          
          <p className="text-white/80 text-lg mb-8 max-w-2xl">
            {userRole === "VETERINARIAN" && "Pronto para cuidar dos seus pacientes com a tecnologia mais avançada em prontuários veterinários."}
            {userRole === "RECEPTIONIST" && "Gerencie agendamentos e atendimentos de forma eficiente com nossa plataforma integrada."}
            {userRole === "CLINIC_ADMIN" && "Acompanhe o desempenho da sua clínica e gerencie sua equipe em um só lugar."}
            {userRole === "ADMIN_MASTER" && "Monitore todas as clínicas e usuários da plataforma FlowCare."}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="lg" className="bg-white/90 text-primary hover:bg-white">
              {userRole === "VETERINARIAN" && "Ver Minha Agenda"}
              {userRole === "RECEPTIONIST" && "Abrir WhatsApp"}
              {userRole === "CLINIC_ADMIN" && "Dashboard"}
              {userRole === "ADMIN_MASTER" && "Painel Global"}
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};