import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Stack } from '@mui/material';
import Services from './Components/Services';
import BusinessHours from './Components/BusinessHours';
import Map from './Components/Map';

export default function MenuTabs() {
  const [value, setValue] = React.useState('appointment');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack sx={{ width: { xs: '90%' }, mx: 'auto', mt: "-30px" }} gap={2}>
      <Tabs

        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        // variant="scrollable"
        // scrollButtons="auto"
        aria-label="tabsMenu"
        sx={{
          backgroundColor: '#fff',
          // paddingRight: '10px',

          boxShadow: '2px 2px 12px #00000014',
          borderRadius: '8px 8px 0px 0px',
          height: 46,
          minHeight: 0,
          width: '100%',
          '.MuiTab-root': {
            padding: '8px 8px 11px 8px',
            minWidth: '0px',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: "0px",
            fontFamily: `"Heebo", Heebo`,
            color: '#858DA8',
            lineHeight: 1.5,


          },
          '& .Mui-selected': {
            // color: '#CA65F0 !important'
            color: '#1976d2 !important'
          }
        }}
      >
        <Tab value="appointment" label="קביעת תור" sx={{ flex: 1 }} />
        <Tab value="services" label="שירותים" sx={{ width: '82px', flex: 1 }} />
        <Tab value="business-hours" label="שעות עבודה" sx={{ flex: 1, width: '104px' }} />
        <Tab value="map" label="מפה" sx={{ width: '60px', maxWidth: '70px', flex: 1 }} />
      </Tabs>


      <Stack 
      bgcolor={'#FFFFFF'} 
      color={'#333'}
      p={'18px'}
      sx={{
        opacity: 1,
        boxShadow: '2px 2px 12px #00000014',
        borderRadius: '8px'
      }}
      >
        {value === 'services' && (
          <Services />
        )}
        {value === 'business-hours' && (
          <BusinessHours />
        )}
        {value === 'map' && (
          // <Map />
          <></>
        )}
        {value === 'appointment' && (
          <></>
        )}
      </Stack>
    </Stack>
  );
}
