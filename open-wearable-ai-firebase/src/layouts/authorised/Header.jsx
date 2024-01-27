import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';

const Header = () => {

    return (
        <>
            <AppBar position="fixed">

                <Toolbar >
                    <Box width={"100%"} >

                        <Button variant="text" color="inherit" href={'/'} disableElevation sx={{ textTransform: 'none' }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                OpenWearableAI.com
                            </Typography>
                        </Button>
                    </Box>

                </Toolbar>
            </AppBar >
        </>
    )
}

export default Header