// FooterButton.tsx
import { Button, Fade } from "@mui/material";
import { useStepperButton } from "../../../../../../../Contexts/StepperButtonContext";

interface FooterButtonProps {
  stepLabels?: string[];
}

const FooterButton = ({ stepLabels }: FooterButtonProps) => {
  const { canProceed, activeStep, goNext } = useStepperButton();

  const label = activeStep === stepLabels?.length! - 1
    ? "סיום"
    : "שלב הבא";

  return (
<Button
      sx={{
        position: 'fixed',         // צף על גבי המסך
        bottom: 10,                // 20 פיקסלים מהתחתית
        left: '50%',               // מתחיל מהמרכז
        transform: 'translateX(-50%)', // מתקן את המרכז כך שיכסה את כל רוחב הכפתור
        width: '93%',              // רוחב יחסי למסך
        maxWidth: '400px',         // הגבלה לרוחב מקסימלי במובייל
        fontFamily: `"Heebo", Heebo`,
        fontWeight: 600,
        fontSize: "14px",
        borderRadius: '50px',
        minHeight: '43px',
        transition: 'background-color 0.2s ease-in-out',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,.26)',
        background: '#1F5AA0',
        opacity: '0.9 !important'
      }}
      onClick={goNext}
      disabled={!canProceed}
      variant="contained"
    >
      {label}
    </Button>
  );
};

export default FooterButton;
