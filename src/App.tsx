import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "./Utilities/Context/SnackBar";
import { customerService, db } from "./Firebase/FirebaseConfig/firebase";
import AppoitmentPage from "./AppoitmentMainPage/Pages/AppoitmentPage/AppoitmentPage";
import { Appointment } from "./Firebase/FirebaseFunctions/Appointment/Appointment";
import OTPVerificationPage from "./AppoitmentMainPage/Pages/OTPVerificationPage/OTPVerificationPage";
import AppWrapper from "./AppWrapper/AppWrapper";
import MangementPage from "./AppoitmentMainPage/Pages/MangementPage/MangementPage";

// const handleAddAppointment = async () => {
//   const customerId = 123456; // customer id
//   const workerId = 67890; // workerId
//   const service = "9IoH6aS8C8OSDnZuyHry"; // serviceId
//   const startDate = getTime().toDate(); // date appointment
//   try {
//     await appointmentService.addAppointment(customerId, workerId, service, startDate);
//     alert("Appointment created successfully!");
//   } catch (error) {
//     console.error("Failed to create appointment: == ", error);
//     alert("Failed to create appointment. Check the console for more information.");
//   }
// };

// const handleAddCustomer = async () => {
//   const customerData = {
//     id: 12345, // customer id
//     firstName: "Omer",
//     lastName: "Levi",
//   };

//   try {
//     await customerService.addCustomer(new Customer(customerData.id, customerData.firstName, customerData.lastName));
//     alert("User created successfully!");
//   } catch (error) {
//     console.error("Failed to create user:", error);
//     alert("Failed to create user. Check the console for more information.");
//   }
// };


// ######################## working hours
const defaultWorkingHours = {
  sunday: { start: "08:00", end: "17:00" },
  monday: { start: "08:00", end: "17:00" },
  tuesday: { start: "08:00", end: "17:00" },
  wednesday: { start: "08:00", end: "17:00" },
  thursday: { start: "08:00", end: "17:00" },
  friday: { start: "08:00", end: "12:30" },
  // saturday:  null // סגור בשבת
};

export const setWorkingHours = async (customerId: number) => {
  customerService.setWorkingHours(customerId, defaultWorkingHours);
};
// #####################################
const today = new Date();
const exampleAppointments: Appointment[] = [
  {
    service: "Meeting with Erin",
    startDate: new Date(2025, 3, 21, 9, 0),
    endDate: new Date(2025, 3, 21, 12, 30),
    customerId: 0,
    workerId: 0,
    approved: false
  },
  {
    service: "Lunch with Lisa",
    startDate: new Date(2025, 3, 21, 12, 0),
    endDate: new Date(2025, 3, 21, 13, 0),
    customerId: 0,
    workerId: 0,
    approved: false
  },
];


export const GeneralRoutes = () => (
  // <Route path="/business-name" element={
  //   // <DrushimThemeProvider>
  //   <>
  //     <CssBaseline />
  //     <Navbar />
  //     <Box flex={1} height={'calc(100dvh - 64px)'}>
  //       {/* <DrushimJobsDataProvider> */}
  //       <SnackbarProvider>
  //         <Outlet />
  //       </SnackbarProvider>
  //       {/* </DrushimJobsDataProvider> */}
  //       <Footer />
  //     </Box>
  //   </>
  //   // </DrushimThemeProvider>
  // }>
  //   {/* <Route index element={<Navigate to="/business-name" replace />} /> */}
  //   <Route path="/business-name" element={<Box flex={1} border={1}>
  //     <Button onClick={handleAddAppointment}>
  //       TEST
  //     </Button>
  //   </Box>} />
  // </Route>

  // <Route path="/business-name" element={<BusinessPage/>} />
  <Route path="/appointment" element={
    <AppoitmentPage />
  } />

);

// export const AuthRoutes = () => (
//   <Route path="/auth" element={
//     <SnackbarProvider>
//       <AuthBackground>
//         <Outlet />
//       </AuthBackground>
//     </SnackbarProvider>
//   }>
//     <Route path="login" element={<LoginPage />} />
//     <Route path="resetPassword" element={<EmailResetPasswordPage />} />
//     <Route path="action" element={<ResetPasswordPage />} />
//     <Route path="*" element={<Navigate to="/auth/login" replace />} />
//     <Route index element={<Navigate to="/auth/login" replace />} />
//   </Route>
// );

export const App = () => {
  return (
    <BrowserRouter>
      {/* <ScrollToTopPageRoute />
      <AuthProvider> */}
      {/* <DialogProvider> */}
      <SnackbarProvider>
        <AppWrapper>
          <Routes>
            {GeneralRoutes()}
            {/* {AuthRoutes()} */}
            {/* {ManagementRoutes()} */}

            {/* Default and fallback routes */}
            <Route path="" element={<Navigate to="/business-name" replace />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
            <Route path="/management" element={<MangementPage />} />
            <Route path="/test" element={<OTPVerificationPage />} />
          </Routes>
        </AppWrapper>
      </SnackbarProvider>
      {/* </DialogProvider> */}
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
};
