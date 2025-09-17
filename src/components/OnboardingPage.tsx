import React, { useState, useEffect } from 'react';
import { OnboardingStep, StepData } from './OnboardingStep';
import { WistiaPlayer } from './WistiaPlayer';
import { toast } from '@/hooks/use-toast';
import instructorImage from '@/assets/instructor-pointing.jpg';

export const OnboardingPage: React.FC = () => {
  const [pageLoadTime] = useState(Date.now());
  const [showStep1Button, setShowStep1Button] = useState(false);
  const [stepsUnlocked, setStepsUnlocked] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1]);

  // Simple 1-minute timer from page load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowStep1Button(true);
      setStepsUnlocked(true);
    }, 60000); // 1 minute

    return () => clearTimeout(timeout);
  }, [pageLoadTime]);

  const handleStep1Complete = () => {
    toast({
      title: "Passo 1 Concluído!",
      description: "Agora você pode acessar os outros passos.",
    });
  };

  const handleStep2Complete = () => {
    toast({
      title: "Diagnóstico Liberado!",
      description: "Passo 2 concluído com sucesso!",
    });
  };

  const handleStepClick = (stepId: number) => {
    if (stepId === 1) {
      // Step 1 is always accessible
      return;
    }
    
    if (!stepsUnlocked) {
      toast({
        title: "Passo Bloqueado",
        description: "Aguarde a liberação automática em 1 minuto.",
        variant: "destructive",
      });
      return;
    }

    // Toggle expansion for steps 2 and 3
    if (stepId === 2 || stepId === 3) {
      setExpandedSteps(prev => 
        prev.includes(stepId) 
          ? prev.filter(id => id !== stepId)
          : [...prev, stepId]
      );
    }
  };

  const getStepStatus = (stepId: number): 'blocked' | 'active' | 'completed' => {
    if (stepId === 1) return 'active';
    if (!stepsUnlocked) return 'blocked';
    return 'active';
  };

  const steps: StepData[] = [
    {
      id: 1,
      title: "⚠️ SEU GARGÁLO DE LUCRO",
      status: getStepStatus(1),
      content: expandedSteps.includes(1) ? (
        <div className="space-y-6">
          <WistiaPlayer 
            mediaId="capkm9wu3d"
            className="w-full"
          />
          {showStep1Button && (
            <div className="animate-fade-in">
              <a
                href="https://payment.ticto.app/O1928D5A5"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleStep1Complete}
                className="btn-premium btn-pulse block text-center w-full"
              >
                💰 Quero Lucrar Mais
              </a>
            </div>
          )}
        </div>
      ) : undefined,
    },
    {
      id: 2,
      title: "Diagnóstico Comercial",
      status: getStepStatus(2),
      content: expandedSteps.includes(2) ? (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30">
            <h3 className="text-2xl font-bold text-accent mb-4">
              🎉 Desconto Exclusivo Liberado!
            </h3>
            <p className="text-lg mb-6">
              Parabéns! Você desbloqueou uma oferta especial.
            </p>
            <a
              href="https://payment.ticto.app/O1928D5A5"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleStep2Complete}
              className="btn-premium btn-pulse inline-block"
            >
              🚀 Quero Lucrar Mais
            </a>
          </div>
        </div>
      ) : undefined,
    },
    {
      id: 3,
      title: "Acessar Script Milionário",
      status: getStepStatus(3),
      content: expandedSteps.includes(3) ? (
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-success/20 to-primary/10 border border-success/30 animate-fade-in">
          <h3 className="text-3xl font-bold text-success mb-4">
            🎯 ACESSE AGORA!
          </h3>
          <p className="text-lg mb-6">
            Seu Script Milionário está pronto para você!
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast({
                title: "🎉 Acesso Liberado!",
                description: "Em breve você receberá as instruções de acesso.",
              });
            }}
            className="btn-premium inline-block bg-gradient-to-r from-success to-primary"
          >
            📚 MEUS ACESSOS
          </a>
        </div>
      ) : undefined,
    },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Welcome Content */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Bem-vindo ao Script Milionário!
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Siga cada passo do nosso onboarding exclusivo para desbloquear 
                seu acesso e <span className="text-accent font-semibold">multiplicar seus resultados</span>.
              </p>
            </div>
            
            {/* Instructor Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <img 
                  src={instructorImage}
                  alt="Instrutor do Script Milionário apontando para os próximos passos"
                  className="w-80 h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Steps */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                Progresso do Onboarding
              </h2>
              <p className="text-muted-foreground">
                Complete cada etapa para desbloquear o conteúdo exclusivo
              </p>
            </div>
            
            <div className="space-y-4">
              {steps.map((step) => (
                <OnboardingStep
                  key={step.id}
                  step={step}
                  onClick={() => handleStepClick(step.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};