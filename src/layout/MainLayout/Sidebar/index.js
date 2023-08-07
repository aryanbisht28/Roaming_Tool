import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import Klogo from './asset/KPMG.png';
// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
// import MenuCard from './MenuCard';
import { drawerWidth } from 'store/constant';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const drawer = (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '00338D'
                }}
            >
                <img
                    src={Klogo}
                    alt="kpmg-logo"
                    style={{
                        width: '12vw',
                        height: '13vh',
                        marginRight: '1rem',
                        objectFit: 'cover'
                    }}
                ></img>

                {/* <Box sx={{ position: 'relative', display: 'inline-block' }}> */}
                <h2>
                    Roaming Assurance
                    <hr style={{ width: '100%' }}></hr>
                </h2>
                {/* <div
                        sx={{
                            position: 'absolute',
                            left: 0,
                            bottom: '-3px',
                            height: '5px',
                            width: '100%',
                            backgroundColor: 'white'
                        }}
                    />
                    <div
                        sx={{
                            position: 'absolute',
                            left: 0,
                            bottom: '-5px',
                            height: '5px',
                            width: '100%',
                            backgroundColor: 'white'
                        }}
                    /> */}
                {/* </Box> */}

                {/* <div sty></div> */}
                {/* <Divider></Divider> */}
                {/* <p> roaming </p> */}
            </div>
            {/* <p style={{fontSize: '0.9em', textAlign: 'center' }}> Roaming Assurance</p> */}
            <BrowserView>
                {/* <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '8px',
                        paddingRight: '8px'
                    }}
                > */}
                <MenuList />
                {/* <MenuCard /> */}
                {/* </PerfectScrollbar> */}
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                    {/* <MenuCard /> */}
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        // background: theme.palette.background.default,
                        color: '#ffffff',
                        borderRight: 'none',
                        // padding:-1000,
                        // margin:-10,
                        // [theme.breakpoints.up('md')]: {
                        //     top: '88px'
                        // },
                        // overflow:'hidden',
                        // webKitscrollbar:''
                        // scrollbarWidth:'none',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        background: '#00338D'
                    }
                }}
                ModalProps={{ keepMounted: true }}
                // color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
