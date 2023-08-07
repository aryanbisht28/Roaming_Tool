import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import './App.css';
// routing
import Routes from 'routes';
// defaultTheme
import themes from 'themes';
// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { Scrollbars } from 'react-custom-scrollbars';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <Scrollbars
            autoHide // Optional: Show scroll bar only when scrolling
            autoHideTimeout={1000} // Optional: Hide scroll bar after a delay
            autoHideDuration={200} // Optional: Animation duration for autoHide
            style={{
                // Custom styles for the scroll bar container
                width: '100vw',
                height: '100vh'
            }}
            thumbStyle={{
                // Custom styles for the scroll bar thumb
                background: 'blue',
                borderRadius: '5px'
            }}
        >
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </Scrollbars>
    );
};

export default App;
