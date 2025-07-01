import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CircularProgress, Typography } from '@mui/material';
import { useWorkers } from '../../../../../../../../Contexts/WorkersContext';
import { useAppointmentForm } from '../../../../../../Contexts/AppointmentFormContext';
import { AppWorker } from '../../../../../../../../../Firebase/FirebaseFunctions/WorkersService';
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

const Workers: React.FC = () => {
  const { state, updateField } = useAppointmentForm();
  const { workers, loading, error } = useWorkers();

  const { setOnNextStep, canProceed, setCanProceed } = useStepperButton();

  const [workerChoosen, setWorkerChoosen] = React.useState<AppWorker | undefined>(undefined);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;

  const handleChoosenWorker = (worker: AppWorker) => {
    setWorkerChoosen(worker);
  
    if (!canProceed) {
      setCanProceed(true); // Enable "Next" button only after valid choice
    }

    setOnNextStep(() => () => {
      updateField("workerId", worker.id!);
      console.log("workerId saved to context:", worker?.id!);
    });
  };

  const filteredWorkers: AppWorker[] = workers.filter((w) => w.services?.includes(state.service));


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
          אצל מי?
        </Typography>
      </Box>
      <Grid
        width={'auto'}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 6, sm: 6, md: 12 }}
        justifyContent={'center'}
      >
        {filteredWorkers.map((worker) => (
          <Grid
            key={worker.id}
            sx={{
              cursor: 'pointer',
              width: 100,
              height: 80,
              borderRadius: 2,
              alignSelf: "start",
              alignItems: "start",
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              border: worker.id === workerChoosen?.id! ? '2px solid #1976d2' : '2px solid transparent',
              backgroundColor: worker.id === workerChoosen?.id! ? 'rgba(25, 118, 210, 0.1)' : '#fff',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() => {
              handleChoosenWorker(worker);
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
                fontWeight={600}
                fontSize={13}
                sx={{
                  fontFamily: `"Heebo", Heebo, sans-serif`,
                  paddingX: 1.5,
                  textAlign: 'center',
                  color: worker.id === state.workerId ? '#1976d2' : '#333',
                }}
              >
                {worker.name.toString()}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


export default Workers;
