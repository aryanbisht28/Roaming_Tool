// import { useState, useRef, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// // import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// // import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import {
//     Avatar,
//     Box,
//     Card,
//     CardContent,
//     Chip,
//     ClickAwayListener,
//     Divider,
//     Grid,
//     InputAdornment,
//     // List,
//     // ListItemButton,
//     // ListItemIcon,
//     // ListItemText,
//     OutlinedInput,
//     Paper,
//     Popper,
//     Stack,
//     Switch,
//     // Typography
// } from '@mui/material';

// // third-party
// import PerfectScrollbar from 'react-perfect-scrollbar';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import Transitions from 'ui-component/extended/Transitions';
// // import UpgradePlanCard from './UpgradePlanCard';
// import User1 from 'assets/images/users/user-round.svg';

// // assets
// import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';

// // ==============================|| PROFILE MENU ||============================== //

// const ProfileSection = () => {
//     const theme = useTheme();
//     const customization = useSelector((state) => state.customization);
//     const navigate = useNavigate();

//     const [sdm, setSdm] = useState(true);
//     const [value, setValue] = useState('');
//     const [notification, setNotification] = useState(false);
//     const [selectedIndex, setSelectedIndex] = useState(-1);

//     const [open, setOpen] = useState(false);
//     /**
//      * anchorRef is used on different componets and specifying one type leads to other components throwing an error
//      * */
//     const anchorRef = useRef(null);
//     const [anchorEl, setAnchorEl] = useState(null);
//     // const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//       setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//       setAnchorEl(null);
//     };
//     const handleLogout = async () => {
//         localStorage.removeItem('token');
//         window.location.href = '/';
//         console.log('Logout');
//     };

//     // const handleClose = (event) => {
//     //     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//     //         return;
//     //     }
//     //     setOpen(false);
//     // };

//     const handleListItemClick = (event, index, route = '') => {
//         setSelectedIndex(index);
//         handleClose(event);

//         if (route && route !== '') {
//             navigate(route);
//         }
//     };
//     const handleToggle = () => {
//         setOpen((prevOpen) => !prevOpen);
//     };

//     const prevOpen = useRef(open);
//     useEffect(() => {
//         if (prevOpen.current === true && open === false) {
//             anchorRef.current.focus();
//         }

//         prevOpen.current = open;
//     }, [open]);

//     return (
//         <>
//             {/* <Chip
//                 sx={{
//                     height: '48px',
//                     alignItems: 'center',
//                     // borderRadius: '27px',
//                     transition: 'all .2s ease-in-out',
//                     borderColor: theme.palette.primary.light,
//                     backgroundColor: theme.palette.primary.light,
//                     '&[aria-controls="menu-list-grow"], &:hover': {
//                         borderColor: theme.palette.primary.main,
//                         background: `${theme.palette.primary.main}!important`,
//                         color: theme.palette.primary.light,
//                         '& svg': {
//                             stroke: theme.palette.primary.light
//                         }
//                     },
//                     '& .MuiChip-label': {
//                         lineHeight: 0
//                     }
//                 }}
//                 icon={ */}
//                     <Avatar
//                         src={User1}
//                         sx={{
//                             ...theme.typography.mediumAvatar,
//                             // margin: '8px 0 8px 8px !important',
//                             cursor: 'pointer'
//                         }}
//                         ref={anchorRef}
//                         aria-controls={open ? 'menu-list-grow' : undefined}
//                         aria-haspopup="true"
//                         color="inherit"
//                         onClick={handleToggle}
//                     />
//                 {/* }
//                 // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
//                 variant="outlined"
//                 ref={anchorRef}
//                 aria-controls={open ? 'menu-list-grow' : undefined}
//                 aria-haspopup="true"

//                 color="primary"
//             /> */}
//             <Popper
//                 placement="bottom-end"
//                 open={open}
//                 anchorEl={anchorRef.current}
//                 role={undefined}
//                 transition
//                 disablePortal
//                 popperOptions={{
//                     modifiers: [
//                         {
//                             name: 'offset',
//                             options: {
//                                 offset: [0, 14]
//                             }
//                         }
//                     ]
//                 }}
//             >
//                 {({ TransitionProps }) => (
//                     <Transitions in={open} {...TransitionProps}>
//                         <Paper>
//                             <ClickAwayListener onClickAway={handleClose}>
//                                 {/* <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}> */}
//                                     <Box sx={{ p: 2 }}>
//                                     <Tooltip title="Account settings">
//           <IconButton
//             onClick={handleClick}
//             size="small"
//             sx={{ ml: 2 }}
//             aria-controls={open ? 'account-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? 'true' : undefined}
//           >
//             <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
//           </IconButton>
//         </Tooltip>
//                                         {/* <Stack>
//                                             <Stack direction="row" spacing={0.5} alignItems="center">
//                                                 <Typography variant="h4">Hello,</Typography>
//                                                 <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
//                                                     {`${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`}
//                                                 </Typography>
//                                             </Stack> */}
//                                             {/* <Typography variant="subtitle2">Project Admin</Typography> */}
//                                         {/* </Stack> */}
//                                         {/* <OutlinedInput
//                                             sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
//                                             id="input-search-profile"
//                                             value={value}
//                                             onChange={(e) => setValue(e.target.value)}
//                                             placeholder="Search profile options"
//                                             startAdornment={
//                                                 <InputAdornment position="start">
//                                                     <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
//                                                 </InputAdornment>
//                                             }
//                                             aria-describedby="search-helper-text"
//                                             inputProps={{
//                                                 'aria-label': 'weight'
//                                             }}
//                                         />
//                                         <Divider /> */}
//                                     </Box>
//                                     {/* <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}> */}
//                                         {/*  <Box sx={{ p: 2 }}>
//                                              <UpgradePlanCard />
//                                              <Divider />
//                                             <Card
//                                                 sx={{
//                                                     bgcolor: theme.palette.primary.light,
//                                                     my: 2
//                                                 }}
//                                             >
//                                                 <CardContent>
//                                                     <Grid container spacing={3} direction="column">
//                                                         <Grid item>
//                                                             <Grid item container alignItems="center" justifyContent="space-between">
//                                                                 <Grid item>
//                                                                     <Typography variant="subtitle1">Start DND Mode</Typography>
//                                                                 </Grid>
//                                                                 <Grid item>
//                                                                     <Switch
//                                                                         color="primary"
//                                                                         checked={sdm}
//                                                                         onChange={(e) => setSdm(e.target.checked)}
//                                                                         name="sdm"
//                                                                         size="small"
//                                                                     />
//                                                                 </Grid>
//                                                             </Grid>
//                                                         </Grid>
//                                                         <Grid item>
//                                                             <Grid item container alignItems="center" justifyContent="space-between">
//                                                                 <Grid item>
//                                                                     <Typography variant="subtitle1">Allow Notifications</Typography>
//                                                                 </Grid>
//                                                                 <Grid item>
//                                                                     <Switch
//                                                                         checked={notification}
//                                                                         onChange={(e) => setNotification(e.target.checked)}
//                                                                         name="sdm"
//                                                                         size="small"
//                                                                     />
//                                                                 </Grid>
//                                                             </Grid>
//                                                         </Grid>
//                                                     </Grid>
//                                                 </CardContent>
//                                             </Card>
//                                             <Divider />
//                                             <List
//                                                 component="nav"
//                                                 sx={{
//                                                     width: '100%',
//                                                     maxWidth: 350,
//                                                     minWidth: 300,
//                                                     backgroundColor: theme.palette.background.paper,
//
//                                                     [theme.breakpoints.down('md')]: {
//                                                         minWidth: '100%'
//                                                     },
//                                                     '& .MuiListItemButton-root': {
//                                                         mt: 0.5
//                                                     }
//                                                 }}
//                                             >
//                                                 <ListItemButton
//                                                     sx={{ borderRadius: `${customization.borderRadius}px` }}
//                                                     selected={selectedIndex === 0}
//                                                     onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile1')}
//                                                 >
//                                                     <ListItemIcon>
//                                                         <IconSettings stroke={1.5} size="1.3rem" />
//                                                     </ListItemIcon>
//                                                     <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
//                                                 </ListItemButton>
//                                                 <ListItemButton
//                                                     sx={{ borderRadius: `${customization.borderRadius}px` }}
//                                                     selected={selectedIndex === 1}
//                                                     onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
//                                                 >
//                                                     <ListItemIcon>
//                                                         <IconUser stroke={1.5} size="1.3rem" />
//                                                     </ListItemIcon>
//                                                     <ListItemText
//                                                         primary={
//                                                             <Grid container spacing={1} justifyContent="space-between">
//                                                                 <Grid item>
//                                                                     <Typography variant="body2">Social Profile</Typography>
//                                                                 </Grid>
//                                                                 <Grid item>
//                                                                     <Chip
//                                                                         label="02"
//                                                                         size="small"
//                                                                         sx={{
//                                                                             bgcolor: theme.palette.warning.dark,
//                                                                             color: theme.palette.background.default
//                                                                         }}
//                                                                     />
//                                                                 </Grid>
//                                                             </Grid>
//                                                         }
//                                                     />
//                                                 </ListItemButton>*/}
//                                         {/* <Box>
//                                             <List>
//                                                 <ListItemButton
//                                                     sx={{ borderRadius: `${customization.borderRadius}px` }}
//                                                     selected={selectedIndex === 0}
//                                                     // onClick={(event) => handleListItemClick(event, 0, '/pages/account/user')}
//                                                 >
//                                                     <ListItemIcon>
//                                                         <IconSettings stroke={1.5} size="1.3rem" />
//                                                     </ListItemIcon>
//                                                     <ListItemText
//                                                         primary={
//                                                             <Typography
//                                                                 variant="body2"
//                                                                 onClick={() => {
//                                                                     window.location.href = '/pages/account/user';
//                                                                 }}
//                                                             >
//                                                                 Account Settings
//                                                             </Typography>
//                                                         }
//                                                     />
//                                                 </ListItemButton>
//                                                 <ListItemButton
//                                                     sx={{ borderRadius: `${customization.borderRadius}px` }}
//                                                     selected={selectedIndex === 4}
//                                                     onClick={handleLogout}
//                                                 >
//                                                     <ListItemIcon>
//                                                         <IconLogout stroke={1.5} size="1.3rem" />
//                                                     </ListItemIcon>
//                                                     <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
//                                                 </ListItemButton>
//                                             </List>
//                                         </Box>
//                                     </PerfectScrollbar> */}
//                                 {/* </MainCard> */}
//                                 <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             overflow: 'visible',
//             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//             mt: 1.5,
//             '& .MuiAvatar-root': {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//             '&:before': {
//               content: '""',
//               display: 'block',
//               position: 'absolute',
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: 'background.paper',
//               transform: 'translateY(-50%) rotate(45deg)',
//               zIndex: 0,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem onClick={handleClose}>
//           <Avatar /> Profile
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Avatar /> My account
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <PersonAdd fontSize="small" />
//           </ListItemIcon>
//           Add another account
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Settings fontSize="small" />
//           </ListItemIcon>
//           Settings
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Logout fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
//                             </ClickAwayListener>
//                         </Paper>
//                     </Transitions>
//                 )}
//             </Popper>
//         </>
//     );
// };

// export default ProfileSection;
import User1 from 'assets/images/users/user-round.svg';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useState, useRef, useEffect, useTheme } from 'react';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export default function ProfileSection() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // const theme = useTheme();
    // const customization = useSelector((state) => state.customization);
    // const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.clear();
        window.location.href = '/';
        console.log('Logout');
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            src={User1}
                            sx={{ width: 32, height: 32, cursor: 'pointer' }}
                            // ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                        />
                        {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        background: 'white',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem disabled>
                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                        {`Hello ${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')},`}
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        window.location.href = '/pages/account/user';
                    }}
                >
                    <Avatar style={{ color: 'black' }} /> My account
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem> */}
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" style={{ color: 'black' }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
