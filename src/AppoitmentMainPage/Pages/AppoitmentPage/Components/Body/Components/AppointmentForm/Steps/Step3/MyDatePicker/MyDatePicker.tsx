import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/he';
import weekday from 'dayjs/plugin/weekday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Box, Typography, IconButton, Paper, Popper, ClickAwayListener, Stack } from '@mui/material';
import { Today } from '@mui/icons-material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import heLocale from 'date-fns/locale/he';
import { ReactComponent as ArrowDownIcon } from '../../../../../../../../../Assets/caret-down-solid.svg';
import { ReactComponent as ArrowRightIcon } from '../../../../../../../../../Assets/right-long-solid.svg';
import TimeSlotPicker from './Components/TimpeSlotPicker/TimeSlotPicker';
import { WeeklySchedule } from './WeeklySchedule';
import { DailySchedule, UnavailableTimes } from './Components/TimpeSlotPicker/DailySchedule';
import { Timestamp } from 'firebase/firestore';
import { useAppointmentForm } from '../../../../../../../Contexts/AppointmentFormContext';
import { useCustomer } from '../../../../../../../../../Contexts/CustomerContext';

dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale('he');



// export interface DayAvailability {
//   date: string; // format YYYY-MM-DD
//   status: 'מלא' | 'סגור' | 'פתוח';
// }

// export interface WeekDaysStripProps {
//   // selectedDate: Dayjs;
//   // onDateChange: (date: Dayjs) => void;
//   availability: DayAvailability[];
//   // availableSlots: string[];
//   // hasTime: boolean;
//   // setHasTime: (val: boolean) => void;
// }

const formatDayLetter = (date: Dayjs) => {
  const day = date.day(); // 0 = sunday , 6 = saturday
  const days = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
  return days[day];
};

// const availability: DayAvailability[] = [
//   { date: '2025-04-10', status: 'סגור' },
//   { date: '2025-04-11', status: 'מלא' },
//   { date: '2025-04-12', status: 'סגור' },
//   { date: '2025-04-13', status: 'מלא' },
//   { date: '2025-04-14', status: 'מלא' },
//   { date: '2025-04-15', status: 'סגור' },
//   // { date: '2025-04-16', status: 'מלא' },
//   // ...
// ];


// Define unavailable times
const unavailableTimes: UnavailableTimes[] = [
  {
    from: Timestamp.fromDate(new Date('2025-04-15T12:00:00')),
    to: Timestamp.fromDate(new Date('2025-04-15T13:00:00')),
    reason: 'Lunch Break',
  },
  {
    from: Timestamp.fromDate(new Date('2025-04-16T00:00:00')),
    to: Timestamp.fromDate(new Date('2025-04-16T23:59:59')),
    reason: 'Full day off',
  },
];

const getValidStartDate = (date: Dayjs): Dayjs => {
  return date.day() === 6 ? date.add(1, 'day').startOf('day') : date.startOf('day');
};


// Create the weekly schedule starting from a specific date
// const weeklySchedule = new WeeklySchedule(
//   dayjs('2025-04-29'), // Starting date (Monday)
//   30,                  // Duration in minutes
//   workingHours,
//   unavailableTimes
// );

const MyDatePicker: React.FC = () => {
  const { state, updateField } = useAppointmentForm();
  const { customer } = useCustomer();
  // const { workers } = useWorkers();

  // const worker: AppWorker | undefined = workers.find((worker: AppWorker) => worker.id === state.workerId);

  const [weeklySchedule, setWeeklySchedule] = React.useState<WeeklySchedule>(
    new WeeklySchedule(
      dayjs().startOf('day'),
      30,
      customer.workingHours!,
      unavailableTimes
    )
  );

  // ################ for TimeSlotPicker (sun)
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  // ##################################

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const startOfWeek = dayjs(state.startDate).startOf('week');
  const weekDays = Array.from({ length: 6 }).map((_, i) => startOfWeek.add(i, 'day'));

  const today = dayjs();
  const currentYear = today.year();
  const maxDate = dayjs().add(6, 'month');  // מס' החודשים שאפשר לקבוע מראש

  const getStatusForDate = (date: Dayjs): DailySchedule['status'] => {
    const found = weeklySchedule.days.find((day) =>
      day.date.isSame(date, 'day')
    );

    return found?.status ?? 'open';
  };


  const handlePrevWeek = () => {
    const prevWeekStart = dayjs(state.startDate).subtract(1, 'week').startOf('week');
    const minDate = today.startOf('day');
  
    const newStartDate = prevWeekStart.isBefore(minDate)
      ? today.startOf('day')
      : prevWeekStart;
  
    updateField("startDate", newStartDate.toDate());
    setSelectedTime(null);
  
    setWeeklySchedule(new WeeklySchedule(
      newStartDate,
      30,
      customer.workingHours!,
      unavailableTimes
    ));
  };
  
  const handleNextWeek = () => {
    const nextWeekStart = dayjs(state.startDate).add(1, 'week').startOf('week');
  
    updateField("startDate", nextWeekStart.toDate());
    setSelectedTime(null);
  
    setWeeklySchedule(new WeeklySchedule(
      nextWeekStart,
      30,
      customer.workingHours!,
      unavailableTimes
    ));
  };
  

  const getStatusColor = (status: DailySchedule['status']) => {
    switch (status) {
      case 'full': return '#f06292';
      case 'close': return '#817c7c';
      default: return '#e0e0e0'; // for 'open'
    }
  };

  const getStatusLabel = (status: DailySchedule['status']) => {
    switch (status) {
      case 'full': return 'מלא';
      case 'close': return 'סגור';
      default: return 'פתוח';
    }
  };


  const toggleCalendar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  return (
    <Stack display={"flex"} direction={"column"} height={'100%'}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={heLocale}>
        <Box>
          <Box display={"flex"} flexDirection={"column"} bgcolor={"#fff"}
            // borderRadius={"16px"} 
            // mr={0.5} 
            // ml={0.5} 
            pt={2} gap={1}>
            {/* navigation buttons + date */}
            <Box display="flex" justifyContent="space-between" alignItems="center" pr={1} pl={1} pb={0.5}>


              <Box display={"flex"} flexDirection={"row"} gap={1.5}>

                {/* תאריך נבחר עם אייקון לוח שנה */}
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  onClick={toggleCalendar}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: '#fff',
                    borderRadius: '10px',
                    px: 1,
                    height: 32,
                    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
                    '&:hover': { bgcolor: '#f5f5f5' },
                  }}
                >
                  <Today sx={{ fontSize: 21, opacity: 0.5 }} />

                  <Typography fontSize={"16px"} fontWeight={400} fontFamily={`"Heebo", Heebo`}>
                    {dayjs(state.startDate).format('DD/MM/YY')}
                  </Typography>
                  <ArrowDownIcon style={{ width: 14, height: 14, opacity: 0.5 }} />
                </Box>

                {/* חץ אחורה (שבוע קודם) */}
                <IconButton
                  onClick={handlePrevWeek}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '10px',
                    height: 32,
                    width: 32,
                    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
                    '&:hover': { bgcolor: '#f5f5f5' },
                  }}
                >
                  {/* <ArrowForwardIos sx={{ fontSize: 18, color: '#333' }} /> */}
                  <Box>
                    <ArrowRightIcon style={{ height: 17, width: 'auto', opacity: 0.6 }} />
                  </Box>
                </IconButton>

                {/* חץ קדימה (שבוע הבא) */}
                <IconButton
                  onClick={handleNextWeek}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '10px',
                    height: 32,
                    width: 32,
                    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
                    '&:hover': { bgcolor: '#f5f5f5' },
                  }}
                >

                  <Box>
                    <ArrowRightIcon style={{ height: 17, width: 'auto', opacity: 0.6, transform: 'rotate(180deg)' }} />
                  </Box>
                </IconButton>
              </Box>

              {/* כפתור היום */}
              <IconButton
                onClick={() => {
                  updateField("startDate", today.startOf('day').toDate());
                  setSelectedTime(null);
                }}
                sx={{
                  bgcolor: '#fff',
                  borderRadius: '10px',
                  px: 1,
                  height: 32,
                  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
                  '&:hover': { bgcolor: '#f5f5f5' },
                }}
              >
                <Typography
                  fontSize={13}
                  fontWeight={700}
                  color={"#49575e"}
                  fontFamily={`"Heebo", Heebo`}>
                  היום
                </Typography>
              </IconButton>
              {/* תפריט Calendar נפתח */}
              <Popper open={open} anchorEl={anchorEl} placement="bottom">
                <ClickAwayListener onClickAway={handleClosePicker}>
                  <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
                    <DateCalendar
                      disableFuture={false}
                      disablePast={true}
                      maxDate={maxDate.toDate()}
                      views={["day"]}
                      value={dayjs(state.startDate).toDate()}
                      onChange={(newValue) => {
                        if (newValue) {
                          const startOfDay = dayjs(newValue).startOf('day');
                          updateField("startDate", startOfDay.toDate());
                          setSelectedTime(null);
                          setWeeklySchedule(
                            new WeeklySchedule(
                              startOfDay.startOf("week"),
                              30,
                              customer.workingHours!,
                              unavailableTimes
                            )
                          );
                        }
                        handleClosePicker();
                      }}
                      slotProps={{
                        leftArrowIcon: { style: { transform: 'rotate(180deg)' } },
                        rightArrowIcon: { style: { transform: 'rotate(180deg)' } },
                      }}
                      
                    />
                  </Box>
                </ClickAwayListener>
              </Popper>
            </Box>


            {/* days strip */}
            <Box pt={"8px"} pb={2} borderTop={"1px solid rgba(73,87,94,.1)"} display="flex" justifyContent="space-between" pr={1} pl={1}>
              {weekDays.map((date) => {
                const status = getStatusForDate(date);
                const isSelected: boolean = date.isSame(dayjs(state.startDate), 'day');
                const pastDay: boolean = date.isBefore(today.startOf('day'));
                return (
                  <Paper
                    key={date.toString()}
                    onClick={() => {
                      if (pastDay) { return; }
                      const selectedDate: Dayjs = dayjs(date).startOf("day");
                      // onDateChange(selectedDate); 
                      updateField("startDate", selectedDate.toDate());
                      setSelectedTime(null);
                      // console.log(selectedDate.day())
                    }}
                    sx={{
                      userSelect: 'none',             // Prevents text selection
                      WebkitTapHighlightColor: 'transparent', // Removes tap highlight on mobile
                      '&:active': {
                        backgroundColor: 'transparent', // Prevents background color change on click
                        // boxShadow: 'none',              // Optional: prevent shadow change
                      },
                      opacity: pastDay ? 0.5 : (status !== 'open' ? 0.8 : 0.9),
                      boxShadow: status !== "open" ? "unset" : `var(--Paper-shadow)`,
                      maxWidth: 35,
                      minWidth: 35,
                      minHeight: 42,
                      cursor: 'pointer',
                      border: isSelected ? (status !== "open" ? '2px solid #9e9e9e' : '2px solid #1F5AA0') : "2px solid #fff",
                      borderRadius: "5px",
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      paddingRight: '5px',
                      paddingLeft: '5px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      bgcolor: '#fff',
                      gap: 0,


                    }}
                  >
                    <Typography
                      sx={{ opacity: 0.9 }}
                      fontWeight={isSelected ? 800 : 400}
                      color={status !== 'open' ? "#9e9e9e" :
                        isSelected ? "#1F5AA0" : "text.secondary"
                      }
                      mt={'0.5px'}
                      fontFamily={`"Heebo", Heebo`}
                      fontSize={"17.8px"}
                      lineHeight={"12px"}
                    >
                      {formatDayLetter(date)}
                    </Typography>

                    <Typography
                      sx={{ opacity: 0.9 }}
                      fontSize={11}
                      color={status !== 'open' ? "#9e9e9e" :
                        isSelected ? "#1F5AA0" : "text.secondary"}
                      fontWeight={isSelected ? 700 : 400}
                      lineHeight={"12px"}
                    >
                      {date.format('DD/MM')}
                    </Typography>

                    {(status === "close" || status === "full") &&
                      <Typography
                        fontFamily={`"Heebo", Heebo`}
                        fontSize={"12px"}
                        fontWeight={800}
                        // mt={0.1}
                        lineHeight={"15px"}
                        sx={{
                          color: '#fff',
                          bgcolor: getStatusColor(status),
                          px: 0.7,
                          borderRadius: 4,
                          opacity: 0.9
                        }}
                      >
                        {getStatusLabel(status)}
                      </Typography>}

                  </Paper>
                );
              })}
            </Box>
          </Box>
        </Box>
      </LocalizationProvider>

      <Box flex={1} pt={2} pb={2} pr={1.5} pl={1.5} sx={{
        maxHeight: 'calc(100vh - 400px)',
        minHeight: "180px",
        height: 'auto',
        overflow: "auto"
      }}>
        <TimeSlotPicker
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          weeklySchedule={weeklySchedule}
        />
      </Box>

    </Stack>
  );
};

export default MyDatePicker;