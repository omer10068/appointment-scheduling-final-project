import React from "react";
import { Box, Typography, Paper, Stack, Divider, Container, Chip } from "@mui/material";
import { ReactComponent as CustomCheckIcon } from '../../../../../../../Assets/check-solid.svg';
import successAnimation from '../../../../../../../../Assets/succcesAnimation2.json';
import Lottie from "lottie-react";

const SuccessScreen = () => {
  return (

      <Lottie animationData={successAnimation} loop={true} />

  );
};


const Finish = () => {

  return (
    <Stack height={'calc(100vh - 230px)'} direction={'column'} justifyContent={"center"} alignItems={"center"} mt={2}>

      <Container maxWidth="xs" sx={{
        width: 'auto',
        mx: 2,
        pb: 3,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: 'rgb(230, 235, 241)',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',

      }}>
        <Stack height={50} direction={'row'} justifyContent={'center'}>
          <Box
            sx={{
              position: 'relative',
              transform: 'translateY(-50%)',
              width: 60,
              height: 60,
              borderRadius: "50%",
              // backgroundColor: "#0f766e",
              // backgroundColor: '#377c2b',
              background: 'linear-gradient(135deg, #1F5AA0,rgb(69, 120, 181), #1F5AA0)',

              // backgroundColor: "#fff",
              opacity: 0.9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            {/* <CustomCheckIcon width={25} height={25} /> */}
            <SuccessScreen />
          </Box>
          
        </Stack>

        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} gap={4}>

      <Box id="title_container" 
      mx={1} 
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={1}
      >
      <Typography textAlign={"center"} variant="h6" fontFamily={`Rubik, sans-serif`} fontWeight={600} gutterBottom>
            בקשתך נשלחה לבית העסק!
          </Typography>
          <Typography textAlign={"center"} fontFamily={`Rubik, sans-serif`} fontWeight={400} variant="body1" color="text.secondary">
          הבקשה שלך התקבלה ונשלחה לאישור. ברגע שתאושר – תקבל/י התראה מאיתנו.
          </Typography>
      </Box>

          <Paper
          elevation={0}
            sx={{
              width: "100%",

              borderRadius: 2,
            }}
          >
            <Stack p={2} spacing={1} divider={<Divider />}>
            <Row label="בית עסק" value="MOVI-LASER" />
              <Row label="לקוח" value="עומר תורג'מן" />
              <Row label="תאריך פגישה" value="20/07/2025" />
              <Row label="שעת פגישה" value="14:00" />
              <Row label="סטטוס הבקשה" value="ממתין לאישור" />
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Stack>
  );
}

// קומפוננטת שורת מידע
const Row = ({ label, value }: { label: string; value: string }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Typography variant="body1" color="textSecondary" fontFamily={'"Rubik", sans-serif'} fontSize={13} fontWeight={500}>{label}</Typography>
    {label === "סטטוס הבקשה" ?
    <Chip size="small" variant="filled" color="warning"
    sx={{
      // height: 'auto',
      // '& .MuiChip-label': {
      //   display: 'block',
      //   whiteSpace: 'normal',
      // },
    }}
    label={value}
  /> :
    <Typography variant="body1" fontWeight={500} color="textPrimary" fontSize={13} fontFamily={'"Rubik", sans-serif'}>{value}</Typography>}
  </Box>
);

export default Finish;
