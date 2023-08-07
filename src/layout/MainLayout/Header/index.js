import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import Typography from '@mui/material/Typography';
// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

function Header({ title, subtitle }) {
    return (
        <>
            {/* logo & toggler button */}
            {/* <Box
                sx={{
                    width: 228,
                    height: 0,
                    padding: 0,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            > */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: '1rem'
                    }}
                >
                    <div>
                        <Typography
                            variant="h4"
                            sx={{
                                margin: 1
                            }}
                        >
                            {/* Hi */}
                            {title}
                            {subtitle != '' ? `/${subtitle}` : ''}
                        </Typography>
                    </div>
                    {/* {subtitle != '' ? (
                        <div>
                            <Typography
                                variant="h4"
                                sx={{
                                    margin: 1
                                }}
                            >
                                {subtitle}
                            </Typography>
                        </div>
                    ) : (
                        ''
                    )} */}
                </div>
                {/* <Box component="span" sx={{ display: { xs: 'none', md: 'block', }, flexGrow: 1 }}>
                    <LogoSection />
                </Box> */}
                {/* <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}> */}
                {/* <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar> */}
                {/* </ButtonBase> */}
                {/* </Box>

            {/* header search */}
                {/* <SearchSection /> */}
                {/* <Box sx={{ flexGrow: 1 }} /> */}
                {/* <h1 style={{ fontSize: '1.5em', textAlign: 'center' }}> Roaming Assurance</h1> */}
                {/* <Box sx={{ flexGrow: 1 }} /> */}

                {/* notification & profile */}
                {/* <NotificationSection /> */}
                <div>
                    <ProfileSection />
                </div>
            </div>
        </>
    );
}

// Header.propTypes = {
//     handleLeftDrawerToggle: PropTypes.func
// };

export default Header;
