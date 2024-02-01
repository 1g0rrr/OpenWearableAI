import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CommonSnackbarsContext = createContext();

export function useCommonSnackbarsContext() {
    const showCommonSnackbar = useContext(CommonSnackbarsContext);
    return showCommonSnackbar;
}


export function CommonSnackbarsProvider({ children }) {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);

    const showSnackbar = useCallback((message) => {
        setSnackbarMessage(message);
        setIsSnackbarOpen(true);
    }, []);


    return (
        <>
            <CommonSnackbarsContext.Provider value={
                showSnackbar
            }>
                {children}
            </CommonSnackbarsContext.Provider>
            <Snackbar
                open={isSnackbarOpen}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                autoHideDuration={6000}
                onClose={() => setIsSnackbarOpen(false)}
            >
                <Alert severity="info"
                    action={
                        <IconButton
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsSnackbarOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >{snackbarMessage}</Alert>
            </Snackbar>
        </>
    );
}

