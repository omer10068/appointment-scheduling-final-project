import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "./Utilities/Context/SnackBar";
import Navbar from "./AppoitmentMainPage/Layout/Navbar/Navbar";
import Footer from "./AppoitmentMainPage/Layout/Footer/Footer";


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
    <Route index element={<Navigate to="/business-name" replace />} />
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
