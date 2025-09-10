import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar,
  User,
  Stethoscope,
  Filter
} from "lucide-react";

export default function Records() {
  const mockRecords = [
    {
      id: "PR001",
      patient: "Thor",
      owner: "Maria Silva",
      species: "Canino",
      breed: "Golden Retriever",
      lastVisit: "2024-09-08",
      status: "Completo",
      diagnosis: "Vacinação anual",
      veterinarian: "Dra. Ana Veterinária"
    },
    {
      id: "PR002", 
      patient: "Luna",
      owner: "Pedro Santos",
      species: "Felino",
      breed: "Persa",
      lastVisit: "2024-09-07",
      status: "Pendente",
      diagnosis: "Consulta de rotina - Aguardando exames",
      veterinarian: "Dra. Ana Veterinária"
    },
    {
      id: "PR003",
      patient: "Max",
      owner: "Ana Costa", 
      species: "Canino",
      breed: "Labrador",
      lastVisit: "2024-09-06",
      status: "Completo",
      diagnosis: "Castração - Pós-operatório normal",
      veterinarian: "Dra. Ana Veterinária"
    },
    {
      id: "PR004",
      patient: "Bella",
      owner: "Carlos Lima",
      species: "Canino", 
      breed: "Poodle",
      lastVisit: "2024-09-05",
      status: "Em andamento",
      diagnosis: "Tratamento dermatológico",
      veterinarian: "Dra. Ana Veterinária"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completo":
        return "bg-success/10 text-success border-success/20";
      case "Pendente":
        return "bg-warning/10 text-warning border-warning/20";
      case "Em andamento":
        return "bg-primary/10 text-primary border-primary/20";
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
            <h1 className="text-2xl font-bold text-foreground">Prontuários</h1>
            <p className="text-muted-foreground">Gerencie os prontuários dos pacientes</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Prontuário
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por paciente, proprietário ou ID..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        <div className="grid gap-6">
          {mockRecords.map((record) => (
            <Card key={record.id} className="shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {record.patient}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{record.owner}</span>
                        <span>•</span>
                        <span>{record.breed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">ID: {record.id}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Última Visita:</span>
                      <span className="text-sm text-muted-foreground">{record.lastVisit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Veterinário:</span>
                      <span className="text-sm text-muted-foreground">{record.veterinarian}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-foreground block mb-1">Diagnóstico/Observações:</span>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {record.diagnosis}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm">
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button size="sm">
                    Imprimir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}