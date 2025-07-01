import { Avatar, Box, Stack, Typography } from "@mui/material";
import Logo from "../../../../../../Assets/logo_transparent_black.png";
import ContactButtons from "./Components/ContactButtons";

export default function BusinessDetails() {
  return <Stack direction={"column"} alignItems={"center"} gap={1}>
    <Avatar
      alt="Logo"
      src={Logo}
      variant="rounded"
      sx={{
        margin: '0px 0px 10px 0px',
        objectFit: 'cover',
        borderRadius: '10px',
        bgcolor: "#FFF",
        width: 120,
        height: 120
      }}
    />
    <Typography
      mt={1}
      fontFamily={"Heebo"}
      fontWeight={700}
      fontSize={"32px"}
      textAlign={"center"}
      lineHeight={"36px"}
      //  p={"0px 20px"}
      sx={{ textShadow: '3px 3px 5px #0000008a' }}
      color="#FFF"
    >
      קליניקה לטיפולי יופי
    </Typography>

    <ContactButtons />
  </Stack>;
}
