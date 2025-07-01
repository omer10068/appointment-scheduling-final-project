import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

export default function BusinessHours() {
  return <Stack direction={"column"} gap={1}>
    <Stack id="Sunday" direction={"row"} gap={1}>
      <Typography 
      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >ראשון</Typography>

      <Divider sx={{ flex: 1, alignSelf: 'center'}} />
      <Typography 

      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >19:00-10:00</Typography>
    </Stack>

    <Stack id="Monday" direction={"row"} gap={1}>
      <Typography 
      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >שני</Typography>

      <Divider sx={{ flex: 1, alignSelf: 'center'}} />
      <Typography 

      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >סגור</Typography>
    </Stack>

    <Stack id="Tuesday" direction={"row"} gap={1}>
      <Typography 
      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >שלישי</Typography>

      <Divider sx={{ flex: 1, alignSelf: 'center'}} />
      <Typography 

      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >19:30-10:00</Typography>
    </Stack>

    <Stack id="Wednesday" direction={"row"} gap={1}>
      <Typography 
      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >רביעי</Typography>

      <Divider sx={{ flex: 1, alignSelf: 'center'}} />
      <Typography 

      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >20:30-10:00</Typography>
    </Stack>

    <Stack id="Thursday" direction={"row"} gap={1}>
      <Typography 
      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >חמישי</Typography>

      <Divider sx={{ flex: 1, alignSelf: 'center'}} />
      <Typography 

      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >20:30-10:00</Typography>
    </Stack>

    <Stack id="Friday" direction={"row"} gap={1}>
      <Typography 
      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >שישי</Typography>

      <Divider sx={{ flex: 1, alignSelf: 'center'}} />
      <Typography 

      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >19:00-10:00</Typography>
    </Stack>

    <Stack id="Saturday" direction={"row"} gap={1}>
      <Typography 
      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >שבת</Typography>

      <Divider sx={{ flex: 1, alignSelf: 'center'}} />
      <Typography 

      letterSpacing={0}
      color="#49575e"
      fontSize={'13px'}
      fontFamily={`"Heebo", Heebo`}
      fontWeight={600}
      lineHeight={'30px'}
      >סגור</Typography>
    </Stack>
  </Stack>;
}
