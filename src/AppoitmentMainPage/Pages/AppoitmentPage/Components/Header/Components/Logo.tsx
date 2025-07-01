import React from "react";
import Logo2 from "../../../../../Assets/logo_transparent_white.png"
import { Box } from "@mui/material";

export default function Logo() {
  return <Box 
  p={"6px 12px 6px 12px"}>
    <img alt="logo" style={{height: '100%', objectFit: 'cover'}} src={Logo2} />
  </Box>;
}
