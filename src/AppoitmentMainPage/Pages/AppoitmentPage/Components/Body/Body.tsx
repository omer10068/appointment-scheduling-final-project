import { Stack } from "@mui/material";
import AppointmentStepper from "./Components/AppointmentForm/AppointmentStepper";
import { WorkersProvider } from "../../../../Contexts/WorkersContext";
import { ServicesProvider } from "../../../../Contexts/ServicesContext";
import { AppointmentFormProvider } from "../../Contexts/AppointmentFormContext";
import { AppointmentsProvider } from "../../../../Contexts/AppointmentsContext";
import React from "react";
import dayjs from "dayjs";

export default function Body() {
  const customerId = '123456';
    const date = React.useMemo(() => dayjs().startOf('day'), []);
    
  return <Stack
    bgcolor={"#f4f4f9"}
    display={"flex"}
    // alignItems={'center'}
    flexDirection={"row"}
    width={"100%"}
    height={'100%'}
    justifyContent={"center"}
  >
    <AppointmentFormProvider>
      <AppointmentsProvider customerId={123456} date={date}>
        <WorkersProvider customerId={customerId}>
          <ServicesProvider customerId={customerId}>
            <AppointmentStepper />
          </ServicesProvider>
        </WorkersProvider>
      </AppointmentsProvider>
    </AppointmentFormProvider>
  </Stack>;
}
