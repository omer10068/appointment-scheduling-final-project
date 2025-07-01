import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Customer } from "../../../Firebase/FirebaseFunctions/Customer/Customer";
import { CustomerProvider } from "../../Contexts/CustomerContext";
import { StepperButtonContext } from "../../Contexts/StepperButtonContext";
import { customerService } from "../../../Firebase/FirebaseConfig/firebase";
import FooterButton from "./Components/Body/Components/AppointmentForm/FooterButton/FooterButton";

const customerId = 123456;

export default function AppoitmentPage() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [canProceed, setCanProceed] = React.useState<boolean>(false);
  const [onNextStep, setOnNextStep] = React.useState<(() => void) | undefined>(undefined);

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const goNext = () => {
    if (onNextStep) onNextStep(); // Execute the step's custom logic
    if (canProceed) {
      setActiveStep((prevStep) => prevStep + 1);
      setCanProceed(false); // Reset after moving
    }
    console.log(activeStep);
  };

  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await customerService.getCustomer(customerId);
        if (customerData) {
          setCustomer(customerData);
        } else {
          setError("Customer not found.");
        }
      } catch (err: any) {
        setError("Error loading customer: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  if (loading) return <Box width={'100%'} height={'100vh'} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
    <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
    <CircularProgress />
    </Box>
  </Box>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!customer) return null;

  return (
    <Stack width="100%" height="100vh">
      <CustomerProvider customer={customer}>
        <StepperButtonContext.Provider
          value={{
            activeStep,
            setActiveStep,
            handleBack,
            canProceed,
            setCanProceed,
            goNext,
            onNextStep,
            setOnNextStep,
          }}
        >
          <Header />
          <Body />
          <FooterButton />

        </StepperButtonContext.Provider>
      </CustomerProvider>
    </Stack>
  );
}
