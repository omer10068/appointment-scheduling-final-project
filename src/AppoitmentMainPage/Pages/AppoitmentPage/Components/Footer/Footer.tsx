import { Box } from "@mui/material";
import FooterButton from "../Body/Components/AppointmentForm/FooterButton/FooterButton";

const steps: string[] = [
  "למה?",
  "למי?",
  "מתי?",
  "סיום"
];

export default function Footer() {
  return <Box
  height={'46px'}
    boxShadow={"0 2px 5px 0 rgba(0,0,0,.26)"}
    borderTop={"1px solid #ccc"}
    display={"flex"}
    justifyContent={"center"}
    paddingTop={"10px"}
    paddingBottom={"10px"}
  >
    <FooterButton stepLabels={steps} />
  </Box>;
}
