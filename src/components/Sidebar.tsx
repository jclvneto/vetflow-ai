import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building2, 
  Calendar, 
  Users, 
  Stethoscope, 
  MessageSquare, 
  BarChart3, 
  Settings,
  LogOut,
  Shield,
  Heart,
  PawPrint
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  userRole: "ADMIN_MASTER" | "CLINIC_ADMIN" | "RECEPTIONIST" | "VETERINARIAN";
  userName: string;
  clinicName?: string;
}

export const Sidebar = ({ userRole, userName, clinicName }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = {
    ADMIN_MASTER: [
      { icon: BarChart3, label: "Dashboard Global", href: "/" },
      { icon: Building2, label: "Gestão de Clínicas", href: "/admin/clinics" },
      { icon: Users, label: "Usuários Globais", href: "/admin/users" },
      { icon: Shield, label: "Configurações", href: "/admin/settings" },
    ],
    CLINIC_ADMIN: [
      { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
      { icon: Users, label: "Equipe", href: "/team" },
      { icon: Calendar, label: "Agenda", href: "/schedule" },
      { icon: Settings, label: "Configurações", href: "/settings" },
    ],
    RECEPTIONIST: [
      { icon: Calendar, label: "Agenda", href: "/schedule" },
      { icon: MessageSquare, label: "WhatsApp", href: "/whatsapp" },
      { icon: Users, label: "Clientes", href: "/clients" },
    ],
    VETERINARIAN: [
      { icon: Calendar, label: "Minha Agenda", href: "/my-schedule" },
      { icon: Stethoscope, label: "Prontuários", href: "/records" },
      { icon: Users, label: "Pacientes", href: "/patients" },
    ],
  };

  const currentMenu = menuItems[userRole];

  return (
    <div className="w-64 bg-gradient-card border-r border-border shadow-medium">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
            <PawPrint className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">FlowCare</h1>
            <p className="text-sm text-muted-foreground">Veterinary CRM</p>
          </div>
        </div>

        <div className="space-y-1">
          {currentMenu.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => navigate(item.href)}
                className={cn(
                  "w-full justify-start gap-3 h-11 text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  isActive && "bg-accent text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{userName}</p>
            {clinicName && (
              <p className="text-xs text-muted-foreground truncate">{clinicName}</p>
            )}
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};