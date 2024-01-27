import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage"
import AuthorisedLayout from "./layouts/authorised/AuthorisedLayout";
import { ThemeProvider, createTheme } from '@mui/material';
import { grey, red, lightGreen, amber, orange, green } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#141414',
        },
        secondary: {
            main: '#4c525e',
        },
        accent: {
            main: '#9c27b0'
        },
        chip: {
            main: grey[300],
            dark: grey[500],
            contrastText: '#141414',
        },
        chipGreen: {
            main: lightGreen[100],
            dark: lightGreen[100],
            contrastText: '#141414',
        },
        chipOrange: {
            main: orange[100],
            dark: orange[100],
            contrastText: '#141414',
        },
        record: {
            main: red[700],
            dark: red[900],

            contrastText: '#fff',
        },
        speech: {
            main: lightGreen[100],
            dark: lightGreen[200],
        },
        waiting: {
            main: lightGreen[100],
            light: lightGreen[100],
            dark: lightGreen[100],
            contrastText: '#141414',
        },
        lightGreen50: {
            main: lightGreen[50],
            contrastText: '#141414',
        },
        tonalOffset: 0.4,
        contrastThreshold: 3,
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element:
            // <AuthProvider>
            <AuthorisedLayout />,
        // </AuthProvider>,
        // errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <MainPage />,
            }
        ],


    },
    // {
    //     path: "/lp",
    //     element: <LayoutsPage />,
    // },
    // {
    //     path: "/login",
    //     element:
    //         <AuthProvider>
    //             <LoginPage />
    //         </AuthProvider>,
    // },
]);

function App() {


    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
        </ThemeProvider>

    )
}

export default App
