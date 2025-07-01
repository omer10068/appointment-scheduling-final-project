import React from 'react';
import { Box, Stack, ToggleButton, Typography } from '@mui/material';
import { AccessAlarmRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
import { WeeklySchedule } from '../../WeeklySchedule';
import { useAppointmentForm } from '../../../../../../../../../Contexts/AppointmentFormContext';
import { useStepperButton } from '../../../../../../../../../../../Contexts/StepperButtonContext';

// const availableSlots = [
//   '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
//   '13:00', '13:30', '14:00', '14:30',
//   '15:00', '15:30', '16:00',
// ];

const TimeSlotPicker = (props: { selectedTime: string | null, setSelectedTime: any, weeklySchedule: WeeklySchedule }) => {
  const { selectedTime, setSelectedTime, weeklySchedule } = props;
  const { state, updateField } = useAppointmentForm();
  const { setOnNextStep, canProceed, setCanProceed } = useStepperButton();
  
  const [availableSlots, setAvailableSlots] = React.useState<string[]>([]);

  React.useEffect(() => {
    const selectedDay = dayjs(state.startDate).startOf('day');

    const matchingDay = weeklySchedule.days.find(day =>
      day.date.isSame(selectedDay, 'day')
    );

    if (matchingDay) {
      setAvailableSlots(matchingDay.availableSlots);
    } else {
      setAvailableSlots([]);
    }
  }, [state.startDate, weeklySchedule]);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newTime: string | null) => {
    if (!newTime) return;

    setSelectedTime(newTime);

    // combine selected date with chosen time slot
    const [hours, minutes] = newTime.split(':').map(Number);
    const updatedStart = dayjs(state.startDate).hour(hours).minute(minutes).second(0).millisecond(0);

    if (!canProceed) {
      setCanProceed(true); // Enable "Next" button only after valid choice
    }

    setOnNextStep(() => () => {
      updateField('startDate', updatedStart.toDate());
      console.log("Start Date saved to context:", updatedStart.toDate());
    });

  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: availableSlots.length >= 4 ? 'repeat(4, 0.25fr)' :
          availableSlots.length === 3 ? 'repeat(3, 0.25fr)' :
            availableSlots.length === 2 ? 'repeat(2, 0.25fr)' :
              'repeat(1, 0.25fr)'
      }}
      justifyItems="center"
      justifyContent="center"
      gap={2}
    >
      {availableSlots.map((slot) => (
        <ToggleButton
          disableRipple
          key={slot}
          value={slot}
          selected={selectedTime === slot}
          onClick={(e) => handleChange(e, slot)}
          sx={{
            paddingRight: '5px',
            paddingLeft: '1px',
            transition: 'all 0.2s ease',
            boxShadow: '0px 1px 4px rgba(5, 59, 122, 0.5)',
            backgroundColor: '#fff',
            width: '100%',
            height: 30,
            fontWeight: 500,
            fontFamily: `"Heebo", Heebo`,
            borderRadius: '8px !important',
            border: '2px solid #fff !important',
            color: '#1F5AA0',
            opacity: 0.9,
            '&.Mui-selected': {
              bgcolor: '#1F5AA0 !important',
              border: '2px solid #1F5AA0 !important',
              opacity: 0.9,
              color: '#fff',
            },
            '&:focus': { bgcolor: '#fff' },
            '&:hover': { bgcolor: '#fff' },
            '&:active': { bgcolor: '#fff' },
          }}
        >
          <Stack direction="row" gap={0.5} pt={0.1}>
            <Box display="flex" flexDirection="column" justifyContent="start">
              <AccessAlarmRounded sx={{ fontSize: 18 }} />
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography fontSize={14} fontWeight={500} fontFamily={`"Heebo", Heebo`}>
                {slot}
              </Typography>
            </Box>
          </Stack>
        </ToggleButton>
      ))}
    </Box>
  );
};

export default TimeSlotPicker;
