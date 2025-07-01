import { Stack } from "@mui/material";
import Logo from "./Components/Logo";
import PreviousPage from "./Components/PreviousPage";

export default function Header() {

  return <Stack
  //  sx={{backgroundColor: 'primary.main',}}
    sx={{opacity: 0.9}}
    bgcolor={"#1F5AA0"}
    width={"100%"}
    height={"52px"}
    display={"flex"}
    flexDirection={"row"}
    position={"relative"}
    justifyContent={"space-between"}
  // p={"6px 12px 6px 12px"}
  // pr={"6px"}
  // pl={"6px"}
  >

    <PreviousPage />
    {/* <Name /> */}
    <Logo />

  </Stack>;
}
