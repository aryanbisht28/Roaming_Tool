import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Logo from '../../assets/images/KPMG.png';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Picture from '../../assets/images/Picture2.png';
import pic from '../../assets/images/pic.jpg';
import UNTITLED from '../../assets/images/UNTITLED.png';
const Signup = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    // const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8080/api/users';
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
            // navigate("/login");
            // console.log(res.message);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    const theme = createTheme();
    return (
        // <Grid
        //     container
        //     component="main"
        //     // sx={{ height: '100vh' }}
        //     xs={12}
        //     sx={{
        //         height: '100vh'
        //     }}
        // >
        //     {/* <Grid
        //         item
        //         xs={4}
        //         // sx={{
        //         //     backgroundImage: 'url(https://source.unsplash.com/random)',
        //         //     backgroundRepeat: 'no-repeat',
        //         //     backgroundSize: 'cover',
        //         //     backgroundPosition: 'center'
        //         // }}
        //     /> */}
        //     <Grid item xs={4}>
        //         <img src={Picture} alt="img" style={{ width: '35vw', height: '100vh' }} />
        //     </Grid>
        //     <Grid item xs={8} component={Paper} elevation={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //         <div
        //             style={{
        //                 background: '#ffff',
        //                 boxShadow: '0px 3px 5px 5px #8888',
        //                 height: '90vh',
        //                 width: '80%',
        //                 /* border: solid; */
        //                 borderRadius: '14px'
        //             }}
        //         >
        //             <Box
        //                 sx={{
        //                     my: 6,
        //                     mx: 4,
        //                     display: 'flex',
        //                     flexDirection: 'column',
        //                     alignItems: 'center',
        //                     justifyContent: 'left'
        //                 }}
        //             >
        //                 <div
        //                     style={{
        //                         display: 'flex',
        //                         justifyContent: 'left',
        //                         alignItems: 'left',
        //                         flexDirection: 'column',
        //                         width: '50%',
        //                         marginBottom: '1rem'
        //                     }}
        //                 >
        //                     <img
        //                         src={Logo}
        //                         alt="Logo"
        //                         style={{ position: 'relative', width: '12vw', height: '15vh', marginLeft: '-24px' }}
        //                     />
        //                     <Typography component="h1" variant="h3">
        //                         Sign Up
        //                     </Typography>
        //                 </div>
        //                 <Box
        //                     component="form"
        //                     noValidate
        //                     onSubmit={handleSubmit}
        //                     sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        //                     style={{ width: '50%' }}
        //                 >
        // <TextField
        //     value={data.firstName}
        //     margin="normal"
        //     required
        //     fullWidth
        //     id="first"
        //     label="First Name"
        //     name="firstName"
        //     onChange={handleChange}
        //     variant="standard"
        // />
        // <TextField
        //     value={data.lastName}
        //     margin="normal"
        //     required
        //     fullWidth
        //     name="lastName"
        //     label="Last Name"
        //     id="last"
        //     onChange={handleChange}
        //     variant="standard"
        // />
        // <TextField
        //     value={data.email}
        //     margin="normal"
        //     required
        //     fullWidth
        //     id="email"
        //     label="Email Address"
        //     name="email"
        //     autoComplete="email"
        //     onChange={handleChange}
        //     variant="standard"
        // />
        // <TextField
        //     value={data.password}
        //     margin="normal"
        //     required
        //     fullWidth
        //     name="password"
        //     label="Password"
        //     type="password"
        //     id="password"
        //     autoComplete="current-password"
        //     onChange={handleChange}
        //     variant="standard"
        // />

        //                     {error && <div className={styles.error_msg}>{error}</div>}
        //                     <Button
        //                         type="submit"
        //                         fullWidth
        //                         variant="contained"
        //                         sx={{ mt: 3, mb: 2 }}
        //                         style={{ backgroundColor: '#00338D' }}
        //                     >
        //                         Sign Up
        //                     </Button>
        //                     <Grid container>
        //                         <Grid item>
        //                             <Link to="/">{'Have an account? Sign In'}</Link>
        //                         </Grid>
        //                     </Grid>
        //                 </Box>
        //             </Box>
        //         </div>
        //     </Grid>
        // </Grid>
        <div
            style={{
                background: '#ffff',
                boxShadow: '0px 3px 5px 5px #8888',
                height: '80vh',
                width: '80%',
                borderRadius: '14px',
                marginLeft: '10rem',
                marginTop: '4rem',
                display: 'flex'
            }}
        >
            <div style={{ width: '40%' }}>
                <img src={pic} alt="img" style={{ width: '100%', height: '100%', borderRadius: '14px' }} />
            </div>
            <div style={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'left',
                        flexDirection: 'column',
                        width: '50%',
                        marginBottom: '-1rem'
                    }}
                >
                    <img src={Logo} alt="Logo" style={{ position: 'relative', width: '10vw', height: '15vh', marginLeft: '-24px' }} />
                    <Typography component="h1" variant="h3">
                        Sign Up
                    </Typography>
                </div>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    style={{ width: '50%' }}
                >
                    <TextField
                        value={data.firstName}
                        margin="normal"
                        required
                        fullWidth
                        id="first"
                        label="First Name"
                        name="firstName"
                        onChange={handleChange}
                        variant="standard"
                    />
                    <TextField
                        value={data.lastName}
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        id="last"
                        onChange={handleChange}
                        variant="standard"
                    />
                    <TextField
                        value={data.email}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        variant="standard"
                    />
                    <TextField
                        value={data.password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        variant="standard"
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{ backgroundColor: '#00338D' }}>
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/">{'Have an account? Sign In'}</Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};
export default Signup;
