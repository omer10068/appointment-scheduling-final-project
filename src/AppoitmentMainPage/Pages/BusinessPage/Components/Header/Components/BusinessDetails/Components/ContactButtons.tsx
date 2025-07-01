import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Instagram } from '@mui/icons-material';
import FacebookIcon from "../../../../../../../Assets/facebook-f-brands.svg";
import GmailIcon from "../../../../../../../Assets/google-brands.svg";
import WhatsAppIcon from "../../../../../../../Assets/whatsapp-brands.svg";


export default function ContactButtons() {
  return (
    <Stack direction="row" spacing={1}>
      <Avatar 
       onClick={() => alert("instagram")}
      sx={{height: '46px', width: '46px', borderRadius: '8px',fontSize: '22px', bgcolor: '#fff', color: '#000' }} variant="rounded">
        <Instagram />
      </Avatar>

      <Avatar 
       onClick={() => alert("facebook")}
      sx={{height: '46px', width: '46px', borderRadius: '8px',fontSize: '22px', bgcolor: '#fff', color: '#000' }} variant="rounded">
            <img src={FacebookIcon} alt="facebook Icon" style={{ width: '22px', height: '23px' }} />
      </Avatar>

      <Avatar 
       onClick={() => alert("whatsapp")}
      sx={{height: '46px', width: '46px', borderRadius: '8px',fontSize: '22px', bgcolor: '#fff', color: '#000' }} variant="rounded">
        <img src={WhatsAppIcon} alt="whatsapp Icon" style={{ width: '22px', height: '23px' }} />
      </Avatar>

      <Avatar 
       onClick={() => alert("gmail")}
      sx={{height: '46px', width: '46px', borderRadius: '8px',fontSize: '22px', bgcolor: '#fff', color: '#000' }} variant="rounded">
         <img src={GmailIcon} alt="gmail Icon" style={{ width: '22px', height: '23px' }} />
      </Avatar>
    </Stack>
  );
}