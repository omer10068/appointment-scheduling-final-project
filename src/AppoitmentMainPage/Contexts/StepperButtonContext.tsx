import React from "react";

interface StepperButtonContextProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleBack: () => void;
  goNext: () => void;
  canProceed: boolean;
  setCanProceed: React.Dispatch<React.SetStateAction<boolean>>;
  onNextStep?: () => void;
  setOnNextStep: React.Dispatch<React.SetStateAction<(() => void) | undefined>>;
}

export const StepperButtonContext = React.createContext<StepperButtonContextProps | undefined>(undefined);

export const StepperButtonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [canProceed, setCanProceed] = React.useState<boolean>(false);
  const [onNextStep, setOnNextStep] = React.useState<(() => void) | undefined>(undefined);

  const handleBack = () => setActiveStep(prev => Math.max(prev - 1, 0));

  const goNext = () => {
    if (onNextStep) onNextStep(); // call callback if defined
    if (canProceed) setActiveStep(prev => prev + 1);
  };

  return (
    <StepperButtonContext.Provider
      value={{
        activeStep,
        setActiveStep,
        handleBack,
        goNext,
        canProceed,
        setCanProceed,
        onNextStep,
        setOnNextStep,
      }}>
      {children}
    </StepperButtonContext.Provider>
  );
};

export const useStepperButton = () => {
  const context = React.useContext(StepperButtonContext);
  if (!context) throw new Error("useStepperButton must be used inside StepperButtonProvider");
  return context;
};
