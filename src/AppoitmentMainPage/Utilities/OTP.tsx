import * as React from 'react';
import { Box, InputBase, styled } from '@mui/material';

export default function OTP({
  separator,
  length,
  value,
  onlyNumbers = false,
  onChange,
  sx
}: {
  separator: React.ReactNode;
  length: number;
  value: string;
  onlyNumbers?: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  sx?: any;
}) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null));

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput?.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput?.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    currentIndex: number
  ) => {
    const target = event.target as HTMLInputElement;

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case 'Delete':
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      case 'Backspace':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    currentIndex: number
  ) => {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    if (onlyNumbers && !/^[0-9]*$/.test(currentValue)) {
      return;
    }

    let indexToEnter = 0;
    while (indexToEnter <= currentIndex) {
      if (inputRefs.current[indexToEnter]?.value && indexToEnter < currentIndex) {
        indexToEnter += 1;
      } else {
        break;
      }
    }

    onChange((prev) => {
      const otpArray = prev.split('');
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join('');
    });

    if (currentValue !== '' && currentIndex < length - 1) {
      focusInput(currentIndex + 1);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    currentIndex: number
  ) => {
    const input = inputRefs.current[currentIndex];
    input?.select();
  };
  

  const handlePaste = (
    event: React.ClipboardEvent<HTMLElement>,
    currentIndex: number
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    // המשך הקוד כרגיל...
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        ...sx
      }}
    >
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <StyledInput
            inputRef={(ele: HTMLInputElement) => {
              inputRefs.current[index] = ele;
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleChange(e, index)}
            onClick={(e) => handleClick(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            value={value[index] ?? ''}
            inputProps={{
              maxLength: 1,
              'aria-label': `Digit ${index + 1} of OTP`,
              name: `otp-${index}`,
              autoComplete: 'one-time-code'
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: 40,
  textAlign: 'center',
  fontSize: 18,
  borderRadius: 8,
  border: `1px solid ${theme.palette.mode === 'dark' ? '#434D5B' : '#DAE2ED'}`,
  backgroundColor: theme.palette.mode === 'dark' ? '#1C2025' : '#fff',
  color: theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 2px 4px rgba(0,0,0, 0.5)'
    : '0 2px 4px rgba(0,0,0, 0.05)',
  '&:hover': {
    borderColor: '#3399FF'
  },
  '&.Mui-focused': {
    borderColor: '#3399FF',
    boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? '#0072E5' : '#80BFFF'}`
  },
  input: {
    textAlign: 'center',
    padding: '8px 0'
  }
}));