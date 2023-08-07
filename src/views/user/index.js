import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Header from 'layout/MainLayout/Header';

function Index() {
    const [firstName, setFirstName] = React.useState(localStorage.getItem('firstname'));
    const [lastName, setLastName] = React.useState(localStorage.getItem('lastname'));
    const [company, setCompany] = React.useState(localStorage.getItem('company'));
    const [phone, setPhone] = React.useState(localStorage.getItem('phone'));
    const [pass, setPass] = React.useState('');
    const [desig, setDesig] = React.useState(localStorage.getItem('desig'));
    const [gender, setGender] = React.useState(localStorage.getItem('gender'));

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const handlePassword = (event) => {
        setPass(event.target.value);
    };

    const handlePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleCompany = (event) => {
        setCompany(event.target.value);
    };

    const handleDesig = (event) => {
        setDesig(event.target.value);
    };

    const handleGender = (event) => {
        setGender(event.target.value);
    };

    const submitDetails = async (event) => {
        event.preventDefault();
        try {
            const url = 'http://localhost:8080/api/users';
            let data = {};
            data['firstName'] = firstName;
            data['lastName'] = lastName;
            data['email'] = localStorage.getItem('mail');
            data['password'] = pass;
            data['phone'] = phone;
            data['company'] = company;
            data['desig'] = desig;
            data['gender'] = gender;
            await axios.put(url, data).then((response) => {
                console.log('hi');

                if (response.data === 'updated') {
                    localStorage.setItem('firstname', firstName);
                    localStorage.setItem('lastname', lastName);
                    localStorage.setItem('mail', data['email']);
                    localStorage.setItem('phone', phone);
                    localStorage.setItem('company', company);
                    localStorage.setItem('desig', desig);
                    localStorage.setItem('gender', gender);
                    window.location.href = '/pages/account/user';
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };
    return (
        <Box style={{ marginTop: '-100px' }}>
            <Header title="" subtitle="" />
            <Card style={{ background: 'white', marginTop: '20px' }}>
                <Grid>
                    <Grid>
                        <Typography
                            style={{ fontSize: '1.5em', fontWeight: '600', textAlign: 'left', padding: '1em', marginLeft: '3.5rem' }}
                        >
                            Edit Profile
                        </Typography>
                    </Grid>
                    <Grid style={{ display: 'flex', margin: '1em', marginLeft: '4rem' }}>
                        <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 120, height: 120 }} />
                            <Button variant="text" style={{ fontSize: '1em' }}>
                                Change Profile Photo
                            </Button>
                        </Grid>
                        <Grid
                            style={{
                                marginLeft: '1.5em',
                                // marginTop: '0.5em',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'

                                // alignItems: 'center'
                            }}
                        >
                            <Typography style={{ fontSize: '1.3em', fontWeight: '500', textAlign: 'left' }}>Profile photo</Typography>
                            <Typography style={{ fontSize: '1em', fontWeight: '200', textAlign: 'left' }}>
                                This will be displayed on your profile.
                            </Typography>
                            {/* <Button variant="text" style={{ fontSize: '0.8em' }}>
                                Change Profile
                            </Button> */}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: '0.6em', display: 'flex', justifyContent: 'space-around' }}>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                id="standard-read-only-input"
                                label="First Name"
                                defaultValue={firstName}
                                style={{ width: '80%' }}
                                onChange={handleFirstName}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                id="standard-read-only-input"
                                label="Last Name"
                                defaultValue={lastName}
                                onChange={handleLastName}
                                style={{ width: '80%' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: '0.6em', display: 'flex', justifyContent: 'space-around' }}>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                id="standard-read-only-input"
                                label="Email-Id"
                                value={localStorage.getItem('mail')}
                                style={{ width: '80%' }}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                id="standard-read-only-input"
                                label="Password"
                                type="password"
                                defaultValue="***********"
                                onChange={handlePassword}
                                style={{ width: '80%' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: '0.6em' }}>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                id="standard-read-only-input"
                                label="Phone Number"
                                defaultValue={phone}
                                onChange={handlePhone}
                                style={{ width: '80%' }}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                id="standard-read-only-input"
                                label="Company"
                                defaultValue={company}
                                style={{ width: '80%' }}
                                onChange={handleCompany}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: '0.6em', display: 'flex', justifyContent: 'space-around' }}>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                id="standard-read-only-input"
                                label="Designation"
                                defaultValue={desig}
                                onChange={handleDesig}
                                style={{ width: '80%' }}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FormControl style={{ width: '80%' }}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Gender"
                                    onChange={handleGender}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        style={{
                            position: 'relative',
                            left: ' calc(100% - 150px)',
                            margin: '1em',
                            background: '#00338D',
                            color: 'white'
                        }}
                        onClick={submitDetails}
                    >
                        Submit
                    </Button>
                </Grid>
            </Card>
        </Box>
    );
}

export default Index;
