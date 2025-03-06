import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

interface SnackbarContextType {
    showSnackbar: (error: SnackbarMessage) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export interface SnackbarMessage {
    message: string;
    severity?: AlertColor;
}

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [snackbarError, setSnackbarError] = useState<SnackbarMessage | null>(null);

    const showSnackbar = (error: SnackbarMessage) => {
        setSnackbarError(error);
    };

    const handleClose = () => {
        setSnackbarError(null);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={!!snackbarError}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbarError?.severity || 'error'}>
                    {snackbarError?.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}