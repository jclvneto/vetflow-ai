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
  Filter,
  Mic
} from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AudioRecordingModal } from "@/components/AudioRecordingModal";

export default function Records() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [records, setRecords] = useState([
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
  ]);

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

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const newRecord = {
      id: `PR${String(records.length + 1).padStart(3, '0')}`,
      patient: (data.get('patient') as string) || '—',
      owner: (data.get('owner') as string) || '—',
      species: (data.get('species') as string) || '—',
      breed: (data.get('breed') as string) || '—',
      lastVisit: (data.get('date') as string) || new Date().toISOString().slice(0, 10),
      status: (data.get('status') as string) || 'Pendente',
      diagnosis: (data.get('diagnosis') as string) || '—',
      veterinarian: (data.get('veterinarian') as string) || '—',
    };

    setRecords([newRecord, ...records]);
    toast({ title: 'Prontuário criado', description: 'O prontuário foi criado com sucesso.' });
    setOpen(false);
    form.reset();
  };

  const handleAudioRecordCreated = (record: any) => {
    setRecords([record, ...records]);
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
          <div className="flex gap-2">
            <Button 
              onClick={() => setAudioModalOpen(true)}
              className="gap-2 bg-gradient-primary hover:shadow-glow transition-smooth"
            >
              <Mic className="w-4 h-4" />
              Gravar com IA
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Manual
                </Button>
              </DialogTrigger>

            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Novo Prontuário</DialogTitle>
                <DialogDescription>Preencha os dados do atendimento.</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreate} className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Paciente</Label>
                    <Input id="patient" name="patient" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Proprietário</Label>
                    <Input id="owner" name="owner" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="species">Espécie</Label>
                    <select
                      id="species"
                      name="species"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Canino"
                    >
                      <option value="Canino">Canino</option>
                      <option value="Felino">Felino</option>
                      <option value="Ave">Ave</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="breed">Raça</Label>
                    <Input id="breed" name="breed" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="veterinarian">Veterinário</Label>
                    <Input id="veterinarian" name="veterinarian" defaultValue="Dra. Ana Veterinária" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="diagnosis">Diagnóstico/Observações</Label>
                    <Textarea id="diagnosis" name="diagnosis" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Pendente"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Completo">Completo</option>
                    </select>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        <AudioRecordingModal
          open={audioModalOpen}
          onOpenChange={setAudioModalOpen}
          onRecordCreated={handleAudioRecordCreated}
        />

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
          {records.map((record) => (
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