import { borderRadius, styled } from "@mui/system";
import { StepConnector, stepConnectorClasses, TextField, Typography } from "@mui/material";
import { StepIconProps } from '@mui/material/StepIcon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ReactComponent as CustomCheckIcon } from '../../../../../../Assets/check-solid.svg';
import { Opacity } from "@mui/icons-material";


export const MyStepIcon = ({ completed, active, icon }: StepIconProps) => {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        transition: completed ? 'all .5s ease' : 'unset',
        borderRadius: '50%',
        background: completed ? "#1F5AA0" : "#fff",
        border: active || completed ? '1px solid #1F5AA0' : '1px solid #fff',
        boxShadow: completed ? 'unset' : '2px 2px 8px -2px #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9
      }}
    >
      {completed ? (
        // <EmojiEventsIcon fontSize="small" sx={{color: '#fff'}} />
        <CustomCheckIcon width={13} height={13} />
      ) : (
        <Typography
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          fontWeight={800}
          fontSize={14}
          fontFamily={`"Heebo", Heebo`}>{icon}</Typography>
      )}
    </div>
  );
};

const height = 20;
export const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  backgroundSize: '200% 100%',
  paddingLeft: 5,
  paddingRight: 6,
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    transition: 'all .5s ease',
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
    height: height
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#bdbdbd',
    opacity: 0.6,
    borderTopWidth: 1.8,
    borderTopStyle: 'solid',
    transition: 'all .5s ease',
    height: height
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: '#053B7A',
    opacity: 0.9,
    transition: 'all .5s ease',
    borderTopStyle: 'solid',
    height: height
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: '#053B7A',
    opacity: 0.9,
    transition: 'all .5s ease',
    borderTopStyle: 'dashed',
    height: height
  },
}));



export const StyledTextField = styled(TextField)(({ theme, error }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    color: theme.palette.secondary.descAndReqText,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.secondary.descAndReqText,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? theme.palette.error.main : theme.palette.primary.descAndReqTitle,
      borderRadius: "4px",
    },
    "&:hover fieldset": {
      borderColor: error ? theme.palette.error.main : theme.palette.primary.descAndReqTitle,
      borderRadius: "4px",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? theme.palette.error.main : theme.palette.primary.descAndReqTitle,
      borderRadius: "4px",
    }
  }
}));