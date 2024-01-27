import { Box, CssBaseline, Fab } from '@mui/material';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { CommonSnackbarsProvider } from '../../providers/CommonSnackbarsProvider';
import FirestoreProvider from '../../providers/FirestoreProvider';
import { ConfirmProvider } from "material-ui-confirm";
const AuthorisedLayout = () => {

    return (
        <>
            <CssBaseline />
            <ConfirmProvider>
                <CommonSnackbarsProvider>
                    <FirestoreProvider>
                        <Box sx={{
                            // display: 'flex',
                            // bgcolor: amber[50],
                            mt: 10
                        }}>

                            <Header />

                            <Outlet context={{}} />
                        </Box>
                    </FirestoreProvider>
                </CommonSnackbarsProvider>
            </ConfirmProvider>
        </>
    )
}

export default AuthorisedLayout