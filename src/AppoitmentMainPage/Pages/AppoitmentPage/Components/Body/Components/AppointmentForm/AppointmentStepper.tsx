import React from "react";
import { Stepper, Step, StepLabel, Typography, Stack, Box } from "@mui/material";
import Workers from "./Steps/Step2/Workers";
import AppointmentTypes from "./Steps/Step1/ServiceTypes";
import { CustomStepConnector, MyStepIcon } from "./AppointmentStepperStyled";
import { useStepperButton } from "../../../../../../Contexts/StepperButtonContext";
import MyDatePicker from "./Steps/Step3/MyDatePicker/MyDatePicker";
import Finish from "./Steps/Step4/Finish";

const steps: string[] = [
  "למה?",
  "למי?",
  "מתי?",
  "סיום"
];

export default function AppointmentForm() {
  const { activeStep } = useStepperButton();

  return (
    <Stack
     width={"100%"} height={"100%"} direction={"column"} justifyContent={"space-between"}>
      <Box height={"100%"} width={"100%"}>
        <Stepper
          connector={<CustomStepConnector />}
          activeStep={activeStep}
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "32px",
            paddingBottom: "16px",
            boxShadow: '0 2px 5px rgba(0,0,0,.08)',
          }}
        >
          {steps.map((label, index) => (
            <Step
              key={index}
              sx={{
                '& .MuiStepLabel-iconContainer': {
                  padding: '0px !important',
                },
                '& .MuiStepLabel-root .Mui-completed': {
                  color: '#1F5AA0!important',
                  transition: 'all .5s ease',
                  opacity: 0.9
                },
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                  color: 'primary',
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: '#1F5AA0!important',
                  fill: '#fff',
                  opacity: 0.9
                },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                  color: 'grey.400',
                },
                '& .MuiStepLabel-root .Mui-disabled': {
                  color: '#49575e',
                },
                '& .MuiStepLabel-label.Mui-disabled.MuiStepLabel-alternativeLabel': {
                  color: 'grey.400',
                }
              }}
            >
              <StepLabel
                slots={{ stepIcon: MyStepIcon }}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}
                slotProps={{
                  stepIcon: {
                    sx: {
                      "&.Mui-active": {
                        fontWeight: 700,
                        fontSize: 14,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: "2px solid #1F5AA0",
                        opacity: 0.9
                      },
                      '&.Mui-active .MuiStepIcon-text': {
                        fill: '#1F5AA0',
                        fontWeight: 700,
                      },
                      "&.Mui-completed": {
                        backgroundColor: 'unset'
                      },
                      '&.Mui-completed .MuiStepIcon-text': {
                        fill: '#fff',
                        fontWeight: 600,
                      },
                      color: '#FFF',
                      border: '1.5px solid #fff',
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      fontWeight: 700,
                      fontSize: 14,
                      width: 32,
                      height: 32,
                      boxShadow: '2px 2px 8px -2px #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '& .MuiStepIcon-text': {
                        fill: '#49575e',
                        fontWeight: 700,
                      },
                    },
                  },
                }}
              >
                <Typography
                  textAlign={"center"}
                  display={"flex"}
                  justifyContent={"center"}
                  fontWeight={700}
                  fontSize={12}
                  fontFamily={`"Heebo", Heebo`}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          {activeStep === steps.length ? (
            <>
              <Typography>כל השלבים הושלמו!</Typography>
            </>
          ) : (
            <Stack paddingTop={1} flex={1} gap={2}>
              {steps[activeStep] === "למה?" && <AppointmentTypes />}
              {steps[activeStep] === "למי?" && <Workers />}
              {steps[activeStep] === "מתי?" && <MyDatePicker />}
              {steps[activeStep] === "סיום" && <Finish />}
            </Stack>
          )}
        </Box>
      </Box>
    </Stack>
  );
}
