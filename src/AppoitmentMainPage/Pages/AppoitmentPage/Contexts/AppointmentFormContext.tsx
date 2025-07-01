// AppointmentFormContext.tsx
import dayjs from 'dayjs';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of the form state
interface AppointmentFormState {
  clientId: number;
  customerId: number;
  service: string;
  workerId: number | string;
  startDate: Date;
  endDate: Date | null;
}

// Initial state
const initialState: AppointmentFormState = {
  clientId: 0,
  customerId: 0,
  service: '',
  workerId: 0,
  startDate: dayjs().startOf('day').toDate(),
  endDate: null,
};

// Action types
type AppointmentFormAction =
  | { type: 'SET_CLIENT_ID'; payload: number }
  | { type: 'SET_CUSTOMER_ID'; payload: number }
  | { type: 'SET_SERVICE_ID'; payload: string }
  | { type: 'SET_WORKER_ID'; payload: number }
  | { type: 'SET_START_DATE'; payload: Date }
  | { type: 'SET_END_DATE'; payload: Date }
  | { type: 'RESET' };

// Reducer function
function appointmentFormReducer(state: AppointmentFormState, action: AppointmentFormAction): AppointmentFormState {
  switch (action.type) {
    case 'SET_CLIENT_ID':
      return { ...state, clientId: action.payload };
    case 'SET_CUSTOMER_ID':
      return { ...state, customerId: action.payload };
    case 'SET_SERVICE_ID':
      return { ...state, service: action.payload };
    case 'SET_WORKER_ID':
      return { ...state, workerId: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Context definition
const AppointmentFormContext = createContext<{
  state: AppointmentFormState;
  dispatch: React.Dispatch<AppointmentFormAction>;
  updateField: (field: keyof AppointmentFormState, value: any) => void;
  resetForm: () => void;
} | undefined>(undefined);

// Provider
export const AppointmentFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentFormReducer, initialState);

  const updateField = (field: keyof AppointmentFormState, value: any) => {
    switch (field) {
      case 'clientId':
        dispatch({ type: 'SET_CLIENT_ID', payload: value });
        break;
      case 'customerId':
        dispatch({ type: 'SET_CUSTOMER_ID', payload: value });
        break;
      case 'service':
        dispatch({ type: 'SET_SERVICE_ID', payload: value });
        break;
      case 'workerId':
        dispatch({ type: 'SET_WORKER_ID', payload: value });
        break;
      case 'startDate':
        dispatch({ type: 'SET_START_DATE', payload: value });
        break;
      case 'endDate':
        dispatch({ type: 'SET_END_DATE', payload: value });
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <AppointmentFormContext.Provider value={{ state, dispatch, updateField, resetForm }}>
      {children}
    </AppointmentFormContext.Provider>
  );
};

// Custom hook
export const useAppointmentForm = () => {
  const context = useContext(AppointmentFormContext);
  if (!context) {
    throw new Error('useAppointmentForm must be used within an AppointmentFormProvider');
  }
  return context;
};
