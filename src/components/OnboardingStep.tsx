import React from 'react';
import { CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepData {
  id: number;
  title: string;
  status: 'blocked' | 'active' | 'completed';
  content?: React.ReactNode;
}

interface OnboardingStepProps {
  step: StepData;
  onClick: () => void;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({ step, onClick }) => {
  const getStepIcon = () => {
    switch (step.status) {
      case 'completed':
        return (
          <CheckCircle 
            className="w-8 h-8 text-success animate-check-pop" 
            fill="currentColor"
          />
        );
      case 'active':
        return (
          <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
            {step.id}
          </div>
        );
      case 'blocked':
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-warning text-warning-foreground flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
        );
    }
  };

  const getStepClasses = () => {
    const baseClasses = "step-card cursor-pointer transition-all duration-300";
    
    switch (step.status) {
      case 'completed':
        return cn(baseClasses, "completed hover:scale-105");
      case 'active':
        return cn(baseClasses, "active hover:scale-105");
      case 'blocked':
      default:
        return cn(baseClasses, "step-blocked");
    }
  };

  const handleClick = () => {
    if (step.status !== 'blocked') {
      onClick();
    }
  };

  return (
    <div 
      className={getStepClasses()}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        {getStepIcon()}
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
          {step.status === 'blocked' && (
            <p className="text-warning-foreground text-sm">
              Complete o passo anterior para desbloquear
            </p>
          )}
        </div>
      </div>
      
      {step.content && step.status === 'active' && (
        <div className="mt-6 animate-fade-in">
          {step.content}
        </div>
      )}
    </div>
  );
};