import { ArrowForwardIosRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useStepperButton } from "../../../../../Contexts/StepperButtonContext";


export default function PreviousPage() {
  const { handleBack } = useStepperButton();

  return <IconButton
  sx={{
    alignContent: 'center',
    pl: '10px',
  }}
  onClick={handleBack}
>
  <ArrowForwardIosRounded sx={{ color: '#FFF', fontSize: 24 }} />
</IconButton>
}
