import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Box, Button, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "./Utilities/Context/SnackBar";
import Navbar from "./AppoitmentMainPage/Layout/Navbar/Navbar";
import Footer from "./AppoitmentMainPage/Layout/Footer/Footer";
import { CustomerService } from "./Firebase/FirebaseFunctions/Customer/CustomerService";
import { db } from "./Firebase/FirebaseConfig/firebase";
import { Customer } from "./Firebase/FirebaseFunctions/Customer/Customer";

const customerService = new CustomerService(db);

const handleAddAppointment = async () => {
  const customerId = 12345; // customer id
  const workerId = 67890; // workerId
  const service = "Haircut"; // serviceId
  const date = new Date(); // date appointment

  try {
    await customerService.addAppointment(customerId, workerId, service, date);
    alert("Appointment created successfully!");
  } catch (error) {
    console.error("Failed to create appointment:", error);
    alert("Failed to create appointment. Check the console for more information.");
  }
};

const handleAddCustomer = async () => {
  const customerData = {
    id: 12345, // customer id
    firstName: "Omer",
    lastName: "Levi",
  };

  try {
    await customerService.addCustomer(new Customer(customerData.id, customerData.firstName, customerData.lastName));
    alert("User created successfully!");
  } catch (error) {
    console.error("Failed to create user:", error);
    alert("Failed to create user. Check the console for more information.");
  }
};


export const GeneralRoutes = () => (
  <Route path="/business-name" element={
    // <DrushimThemeProvider>
    <>
      <CssBaseline />
      <Navbar />
      <Box flex={1} height={'calc(100dvh - 64px)'}>
        {/* <DrushimJobsDataProvider> */}
        <SnackbarProvider>
          <Outlet />
        </SnackbarProvider>
        {/* </DrushimJobsDataProvider> */}
        <Footer />
      </Box>
    </>
    // </DrushimThemeProvider>
  }>
    {/* <Route index element={<Navigate to="/business-name" replace />} /> */}
    <Route path="/business-name" element={<Box flex={1} border={1}>
      <Button onClick={handleAddAppointment}>
        TEST
      </Button>
    </Box>} />
  </Route>
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
        <Routes>
          {GeneralRoutes()}
          {/* {AuthRoutes()} */}
          {/* {ManagementRoutes()} */}

          {/* Default and fallback routes */}
          <Route path="" element={<Navigate to="/business-name" replace />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </SnackbarProvider>
      {/* </DialogProvider> */}
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
};
