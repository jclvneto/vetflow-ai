import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAudioRecording } from "@/hooks/useAudioRecording";
import { Mic, MicOff, Square, Bot, FileText } from "lucide-react";

interface AudioRecordingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecordCreated: (record: any) => void;
}

interface ExtractedData {
  patient: string;
  owner: string;
  species: string;
  breed: string;
  diagnosis: string;
  veterinarian: string;
  status: string;
}

export const AudioRecordingModal = ({ open, onOpenChange, onRecordCreated }: AudioRecordingModalProps) => {
  const { toast } = useToast();
  const { isRecording, transcript, startRecording, stopRecording, error } = useAudioRecording();
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processTranscriptWithAI = async (text: string): Promise<ExtractedData> => {
    // Simula processamento de IA para extrair dados estruturados
    // Em produção, isso seria uma chamada para OpenAI, Claude, etc.
    
    setIsProcessing(true);
    
    // Simulação de delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Lógica simples de extração baseada em palavras-chave
    const lowerText = text.toLowerCase();
    
    let patient = '';
    let owner = '';
    let species = 'Canino';
    let breed = '';
    let diagnosis = text;
    let veterinarian = 'Dra. Ana Veterinária';
    let status = 'Pendente';

    // Extração básica de nomes (primeira palavra após "paciente" ou "animal")
    const patientMatch = text.match(/(?:paciente|animal|pet|cachorro|gato|cão)\s+(?:chamado|chamada|de nome|é o|é a)?\s*([a-záéíóúâêîôûàèìòùç]+)/i);
    if (patientMatch) {
      patient = patientMatch[1];
    }

    // Extração de proprietário
    const ownerMatch = text.match(/(?:proprietário|dono|dona|cliente|senhor|senhora)\s+(?:é o|é a|chamado|chamada)?\s*([a-záéíóúâêîôûàèìòùç\s]+)/i);
    if (ownerMatch) {
      owner = ownerMatch[1].split(' ').slice(0, 2).join(' '); // Pega apenas nome e sobrenome
    }

    // Detecção de espécie
    if (lowerText.includes('gato') || lowerText.includes('felino')) {
      species = 'Felino';
    } else if (lowerText.includes('ave') || lowerText.includes('pássaro')) {
      species = 'Ave';
    }

    // Extração de raça
    const breedMatch = text.match(/(?:raça|é um|é uma)\s+([a-záéíóúâêîôûàèìòùç\s]+)/i);
    if (breedMatch) {
      breed = breedMatch[1].split(' ').slice(0, 2).join(' ');
    }

    // Determina status baseado no conteúdo
    if (lowerText.includes('consulta') || lowerText.includes('exame')) {
      status = 'Em andamento';
    } else if (lowerText.includes('vacinação') || lowerText.includes('vermífugo')) {
      status = 'Completo';
    }

    setIsProcessing(false);

    return {
      patient: patient || 'Não identificado',
      owner: owner || 'Não identificado', 
      species,
      breed: breed || 'SRD',
      diagnosis,
      veterinarian,
      status
    };
  };

  const handleProcessTranscript = async () => {
    if (!transcript.trim()) {
      toast({
        title: 'Erro',
        description: 'Nenhuma transcrição disponível para processar.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const data = await processTranscriptWithAI(transcript);
      setExtractedData(data);
      toast({
        title: 'Dados extraídos',
        description: 'IA processou a gravação e extraiu os dados do prontuário.'
      });
    } catch (err) {
      toast({
        title: 'Erro no processamento',
        description: 'Erro ao processar transcrição com IA.',
        variant: 'destructive'
      });
    }
  };

  const handleCreateRecord = () => {
    if (!extractedData) return;

    const newRecord = {
      id: `PR${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      patient: extractedData.patient,
      owner: extractedData.owner,
      species: extractedData.species,
      breed: extractedData.breed,
      lastVisit: new Date().toISOString().slice(0, 10),
      status: extractedData.status,
      diagnosis: extractedData.diagnosis,
      veterinarian: extractedData.veterinarian
    };

    onRecordCreated(newRecord);
    toast({
      title: 'Prontuário criado',
      description: 'Prontuário foi criado com sucesso a partir da gravação.'
    });
    
    // Reset state
    setExtractedData(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    if (isRecording) {
      stopRecording();
    }
    setExtractedData(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Gravar Prontuário com IA
          </DialogTitle>
          <DialogDescription>
            Grave o atendimento e deixe a IA extrair os dados automaticamente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recording Controls */}
          <div className="flex items-center justify-center space-x-4">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                size="lg"
                className="gap-2 bg-gradient-primary hover:shadow-glow transition-smooth"
              >
                <Mic className="w-5 h-5" />
                Iniciar Gravação
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                size="lg"
                variant="destructive"
                className="gap-2"
              >
                <Square className="w-5 h-5" />
                Parar Gravação
              </Button>
            )}
            
            {isRecording && (
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 animate-pulse">
                <MicOff className="w-3 h-3 mr-1" />
                Gravando...
              </Badge>
            )}
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
              {error}
            </div>
          )}

          {/* Transcript */}
          {transcript && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Transcrição:</h4>
                <Button
                  onClick={handleProcessTranscript}
                  size="sm"
                  disabled={isProcessing}
                  className="gap-2"
                >
                  <Bot className="w-4 h-4" />
                  {isProcessing ? 'Processando...' : 'Processar com IA'}
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border max-h-32 overflow-y-auto">
                <p className="text-sm text-muted-foreground">{transcript}</p>
              </div>
            </div>
          )}

          {/* Extracted Data */}
          {extractedData && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Dados Extraídos:
              </h4>
              <div className="grid grid-cols-2 gap-4 p-4 bg-success/5 rounded-lg border border-success/20">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Paciente:</span>
                  <p className="text-sm text-foreground">{extractedData.patient}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Proprietário:</span>
                  <p className="text-sm text-foreground">{extractedData.owner}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Espécie:</span>
                  <p className="text-sm text-foreground">{extractedData.species}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Raça:</span>
                  <p className="text-sm text-foreground">{extractedData.breed}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs font-medium text-muted-foreground">Diagnóstico:</span>
                  <p className="text-sm text-foreground line-clamp-3">{extractedData.diagnosis}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          {extractedData && (
            <Button onClick={handleCreateRecord}>
              Criar Prontuário
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};