import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material';
import Typography from '@mui/material/Typography';
import Img from '../../assets/images/Picture.jpg';
import Logo from '../../assets/images/KPMG.png';
import pic from '../../assets/images/pic.jpg';
import UNTITLED from '../../assets/images/UNTITLED.png';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    console.log(data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8080/api/auth';
            const { data: res } = await axios.post(url, data);
            localStorage.setItem('firstname', res.data['firstname']);
            localStorage.setItem('lastname', res.data['lastname']);
            localStorage.setItem('mail', res.data['mail']);
            localStorage.setItem('token', res.data['token']);
            localStorage.setItem('phone', res.data['phone']);
            localStorage.setItem('company', res.data['company']);
            localStorage.setItem('desig', res.data['desig']);
            localStorage.setItem('gender', res.data['gender']);

            window.location = '/pages/dashboard/default';
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    return (
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
                        marginBottom: '2rem'
                    }}
                >
                    <img src={Logo} alt="Logo" style={{ position: 'relative', width: '10vw', height: '15vh', marginLeft: '-24px' }} />
                    <Typography component="h1" variant="h3">
                        Sign in
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
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        variant="standard"
                        autoComplete="email"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        variant="standard"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{ backgroundColor: '#00338D' }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup">{'Didnt have an account? Sign Up'}</Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};
export default Login;
