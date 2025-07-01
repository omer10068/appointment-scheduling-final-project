import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CircularProgress, Typography } from '@mui/material';
import { useServices } from '../../../../../../../../Contexts/ServicesContext';
import { Service } from '../../../../../../../../../Firebase/FirebaseFunctions/Service/Service';
import { useAppointmentForm } from '../../../../../../Contexts/AppointmentFormContext';
import { useStepperButton } from '../../../../../../../../Contexts/StepperButtonContext';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  height: "100%",
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }
  ),
}));

const ServiceTypes: React.FC = () => {
  const { services, loading, error, refresh } = useServices();
  const { updateField } = useAppointmentForm();
  const { setOnNextStep, canProceed, setCanProceed } = useStepperButton();

  const [serviceChoosen, setServiceChoosen] = React.useState<Service | undefined>(undefined);

  const handleChooseService = (service: Service) => {
    setServiceChoosen(service);
  
    if (!canProceed) {
      setCanProceed(true); // Enable "Next" button only after valid choice
    }

    setOnNextStep(() => () => {
      updateField("service", service.id!);
      console.log("service saved to context:", service?.id!);
    });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;



  return (
    <Box sx={{ flexGrow: 1 }} display={"flex"} flexDirection={"column"} gap={2}>
      <Box mt={"14px"} ml={"8px"} mb={"8px"}>
        <Typography

          ml={"8px"}
          color={"#49575e"}
          fontFamily={`"Heebo", Heebo`}
          fontSize={17.5}
          fontWeight={750}
        >
          בחירת פגישה
        </Typography>
      </Box>
      <Grid width={'auto'} container spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 6, sm: 6, md: 12 }}
        justifyContent={'center'}
      >
        {services.map((service: Service) => (
          <Grid
            key={service.id}
            sx={{
              display: 'flex',
              alignContent: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              cursor: 'pointer',
              maxWidth: "100px",
              minWidth: "100px",
              minHeight: "65px",
              maxHeight: "65px",
              padding: '5px 3px',
              borderRadius: 2,
              alignSelf: "start",
              alignItems: "start",
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              border: service.id === serviceChoosen?.id ? '2px solid #1976d2' : '2px solid transparent',
              backgroundColor: service.id === serviceChoosen?.id ? 'rgba(25, 118, 210, 0.1)' : '#fff',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() => {
              // updateField("service", service.id)
            handleChooseService(service);
            }}
          >
            <Item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
            >
              <Typography
                fontWeight={500}
                fontSize={13}
                sx={{
                  fontFamily: `"Heebo", Heebo`,
                  // paddingX: 1.5,
                  lineHeight: '13px',
                  textAlign: 'center',
                  overflowWrap: 'break-word',
                  overflow: 'hidden',
                  color: service.id === serviceChoosen?.id ? '#1976d2' : '#333',
                }}
              >
                {service.name.toString()}
              </Typography>
            </Item>
          </Grid>


        ))}
      </Grid>
    </Box>
  );
}

export default ServiceTypes;