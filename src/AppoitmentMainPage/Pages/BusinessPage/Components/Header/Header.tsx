import { Avatar, Box, IconButton, Stack } from "@mui/material";
import BusinessDetails from "./Components/BusinessDetails/BusinessDetails";
import backgroundImage from "../../../../Assets/logo_transparent_black.png"
import { Phone } from "@mui/icons-material";
import Waze from "../../../../Assets/waze-brands.svg";
import Share from "../../../../Assets/share-svgrepo-com (1).svg";


export default function Header() {
  return <Stack
    direction={"column"}
    height={310}
    justifyContent={"start"}
    alignItems={"end"}
    sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: { xs: 'cover', md: '500px 500px' },
      backgroundRepeat: 'no-repeat',
      backgroundPosition: { xs: 'center', md: 'center' },
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // border: 1
    }}
  >
    <Stack
      mt={2}

      gap={1}
      direction={"row"}
      justifyContent={"center"}
      alignSelf={"center"}
    // flex={1}
    // width={1}
    // pr={3}
    // pl={3}
    >
      <Box width={'95%'} position={"absolute"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          
          <Avatar
            onClick={() => alert("waze")}
            sx={{ height: '42px', width: '42px', bgcolor: '#fff', color: '#000' }} variant="rounded">
            <img src={Waze} alt="Waze Icon" style={{ width: '22px', height: '23px' }} />

          </Avatar>
          <Avatar
           onClick={() => alert("phone")}
            sx={{ height: '46px', width: '42px', bgcolor: '#fff', color: '#000' }} variant="rounded">
            <Phone />
          </Avatar>
        </Box>
        <IconButton sx={{ height: 'fit-content', transform: 'rotate(180deg)' }}  onClick={() => alert("share")}>
        <img src={Share} alt="Share Icon" style={{ width: '20px', height: '20px' }} />
        </IconButton>
       
      </Box>
      <BusinessDetails />
      {/* <Box flex={1} border={1}>
            <Avatar 
            sx={{height: '46px', width: '46px', borderRadius: '8px',fontSize: '22px', bgcolor: '#fff', color: '#000' }} variant="rounded">
              <Instagram />
            </Avatar>
    </Box> */}
    </Stack>
  </Stack>;
}
