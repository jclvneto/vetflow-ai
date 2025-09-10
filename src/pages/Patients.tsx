import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Plus, 
  Calendar,
  User,
  Heart,
  Filter,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function Patients() {
  const mockPatients = [
    {
      id: "P001",
      name: "Thor",
      species: "Canino",
      breed: "Golden Retriever",
      age: "3 anos",
      owner: "Maria Silva",
      phone: "(11) 99999-0001",
      email: "maria.silva@email.com",
      address: "Rua das Flores, 123",
      lastVisit: "2024-09-08",
      status: "Saudável",
      avatar: ""
    },
    {
      id: "P002",
      name: "Luna", 
      species: "Felino",
      breed: "Persa",
      age: "2 anos",
      owner: "Pedro Santos",
      phone: "(11) 99999-0002", 
      email: "pedro.santos@email.com",
      address: "Av. Central, 456",
      lastVisit: "2024-09-07",
      status: "Em tratamento",
      avatar: ""
    },
    {
      id: "P003",
      name: "Max",
      species: "Canino", 
      breed: "Labrador",
      age: "5 anos",
      owner: "Ana Costa",
      phone: "(11) 99999-0003",
      email: "ana.costa@email.com", 
      address: "Rua do Parque, 789",
      lastVisit: "2024-09-06",
      status: "Pós-cirúrgico",
      avatar: ""
    },
    {
      id: "P004",
      name: "Bella",
      species: "Canino",
      breed: "Poodle", 
      age: "4 anos",
      owner: "Carlos Lima",
      phone: "(11) 99999-0004",
      email: "carlos.lima@email.com",
      address: "Rua Nova, 321",
      lastVisit: "2024-09-05",
      status: "Saudável",
      avatar: ""
    },
    {
      id: "P005",
      name: "Rocky",
      species: "Canino",
      breed: "Pitbull", 
      age: "6 anos", 
      owner: "Fernanda Oliveira",
      phone: "(11) 99999-0005",
      email: "fernanda.oliveira@email.com",
      address: "Av. Brasil, 654",
      lastVisit: "2024-09-04",
      status: "Acompanhamento",
      avatar: ""
    },
    {
      id: "P006",
      name: "Milo",
      species: "Felino",
      breed: "Siamês",
      age: "1 ano",
      owner: "Roberto Ferreira", 
      phone: "(11) 99999-0006",
      email: "roberto.ferreira@email.com",
      address: "Rua Verde, 987",
      lastVisit: "2024-09-03", 
      status: "Saudável",
      avatar: ""
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Saudável":
        return "bg-success/10 text-success border-success/20";
      case "Em tratamento":
        return "bg-warning/10 text-warning border-warning/20";
      case "Pós-cirúrgico":
        return "bg-primary/10 text-primary border-primary/20";
      case "Acompanhamento":
        return "bg-info/10 text-info border-info/20";
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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pacientes</h1>
            <p className="text-muted-foreground">Gerencie os pacientes da clínica</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Cadastrar Paciente
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nome, proprietário ou ID..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPatients.map((patient) => (
            <Card key={patient.id} className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                      {patient.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg font-semibold text-foreground truncate">
                        {patient.name}
                      </CardTitle>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {patient.breed} • {patient.age}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID: {patient.id}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{patient.owner}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{patient.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground truncate">
                      {patient.email}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground truncate">
                      {patient.address}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Última visita: {patient.lastVisit}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Prontuário
                  </Button>
                  <Button size="sm" className="flex-1">
                    Agendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline">
            Carregar Mais Pacientes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}