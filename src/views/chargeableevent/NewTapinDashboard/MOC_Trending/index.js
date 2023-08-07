import React, { useState, useEffect } from 'react';
import TopOperator from './TopOperator';
import TotalDuration from './TotalDuration';
import TapinTrend from './TapinTrend';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';

function Index() {
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [tadig, setTadig] = useState('');
    const [countrymenu, setcountrymenu] = useState([]);
    const [tadigmenu, settadigmenu] = useState([]);
    const [mocsummarry, setmocsummarry] = useState({});
    const [topoperatordata, settopoperatordata] = useState([]);
    const [topoperatorlabel, settopoperatorlabel] = useState([]);
    const [trenddata, settrenddata] = useState([]);
    const [trenddata2, settrenddata2] = useState([]);
    const [trendlabel, settrendlabel] = useState([]);
    const [dis, setdis] = useState(true);
    const [updateState, setUpdateState] = useState(false);

    useEffect(() => {
        const url = 'http://localhost:8080/ChargeableEventGeneration/tapin/countadig';
        axios.get(url).then((response) => {
            console.log('Get req', response.data[0], response.data[1]);
            settadigmenu(response.data[1]);
            setcountrymenu(response.data[0]);
            console.log('tadigmenu', tadigmenu);
        });
        const url1 = 'http://localhost:8080/ChargeableEventGeneration/tapin/mocsummary';
        axios.get(url1).then((response) => {
            // console.log('Get req', response.data[0], response.data[1]);
            setmocsummarry(response.data);
        });
    }, []);

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleClick = () => {
        // Set updateState to true to trigger a re-render
        console.log('re-render');
        setUpdateState(true);
    };

    const handleCountry = async (event) => {
        // console.log('jhi');
        try {
            if (event.target.value === 'clear') {
                // window.location.href = '/pages/ChargeableEventGeneration/tapindash';
                handleClick();
            } else {
                setCountry(event.target.value);
                let data = {};
                data['country'] = event.target.value;
                const url = 'http://localhost:8080/ChargeableEventGeneration/tapin/mocfiltercountry';
                const { data: res } = await axios.post(url, data);
                console.log('res', res);
                settadigmenu(res.tadig);
                let topoperatordata = [];
                let topoperatorlabel = [];
                res.countries.map((val) => {
                    // console.log('val', val);
                    topoperatordata.push(val['maxGROSSSDR']);
                    topoperatorlabel.push(val['_id']);
                });
                // console.log(topoperatordata,topoperatorlabel)
                let data1 = [];
                let data2 = [];
                let label = [];
                res.MTCTREND.map((dat) => {
                    data1.push(dat['maxMTCCOUNT']);
                    data2.push(dat['maxMTCTOTALSDR']);
                    label.push(dat['_id']);
                });
                settrenddata(data1);
                settrenddata2(data2);
                settrendlabel(label);
                // console.log('topoperatorlabel', topoperatorlabel);
                settopoperatordata(topoperatordata);
                settopoperatorlabel(topoperatorlabel);
                setmocsummarry(res);
                setdis(false);
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    const handleTadig = async (event) => {
        try {
            setTadig(event.target.value);
            let data = {};
            data['country'] = country;
            data['tadig'] = event.target.value;
            const url = 'http://localhost:8080/ChargeableEventGeneration/tapin/mocfiltertadig';
            const { data: res } = await axios.post(url, data);
            console.log('res tadig', res.countries);
            let topoperatordata = [];
            let topoperatorlabel = [];
            res.countries.map((val) => {
                // console.log('val', val);
                topoperatordata.push(val['maxGROSSSDR']);
                topoperatorlabel.push(val['_id']);
            });
            let data1 = [];
            let data2 = [];
            let label = [];
            res.MTCTREND.map((dat) => {
                data1.push(dat['maxMTCCOUNT']);
                data2.push(dat['maxMTCTOTALSDR']);
                label.push(dat['_id']);
            });
            settrenddata(data1);
            settrenddata2(data2);
            settrendlabel(label);
            // console.log('topoperatorlabel', topoperatorlabel);
            settopoperatordata(topoperatordata);
            settopoperatorlabel(topoperatorlabel);
            setmocsummarry(res);
            // setdis(false);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    function valuetext(value) {
        return `${value}°C`;
    }

    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container spacing={gridSpacing} xs={12}>
            <Grid container spacing={gridSpacing} sx={{ mt: 1, ml: 0 }} xs={12}>
                <Grid item xs={4}>
                    <Card
                        style={{
                            position: 'relative',
                            marginBottom: '5%',
                            padding: '1%',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#ffff'
                        }}
                    >
                        <h3 style={{ margin: '0.2rem' }}>MOC Total Duration</h3>
                        <div
                            style={{
                                width: '95%',
                                height: '1.5px',
                                backgroundColor: '#6898ce',
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginLeft: '0.5rem'
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: '4.5vh',
                                marginBottom: '0.5rem'
                            }}
                        >
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 4.5H20C20.5304 4.5 21.0391 4.71071 21.4142 5.08579C21.7893 5.46086 22 5.96957 22 6.5V18.5C22 19.0304 21.7893 19.5391 21.4142 19.9142C21.0391 20.2893 20.5304 20.5 20 20.5H4C3.46957 20.5 2.96086 20.2893 2.58579 19.9142C2.21071 19.5391 2 19.0304 2 18.5V6.5C2 5.96957 2.21071 5.46086 2.58579 5.08579C2.96086 4.71071 3.46957 4.5 4 4.5ZM4 6.5V18.5H11V6.5H4ZM20 18.5V6.5H18.76C19 7.04 18.95 7.57 18.95 7.63C18.88 8.3 18.41 9 18.24 9.25L15.91 11.8L19.23 11.78L19.24 13L14.04 12.97L14 11.97C14 11.97 17.05 8.74 17.2 8.45C17.34 8.17 17.91 6.5 16.5 6.5C15.27 6.55 15.41 7.8 15.41 7.8L13.87 7.81C13.87 7.81 13.88 7.15 14.25 6.5H13V18.5H15.58L15.57 17.64L16.54 17.63C16.54 17.63 17.45 17.47 17.46 16.58C17.5 15.58 16.65 15.58 16.5 15.58C16.37 15.58 15.43 15.63 15.43 16.45H13.91C13.91 16.45 13.95 14.39 16.5 14.39C19.1 14.39 18.96 16.41 18.96 16.41C18.96 16.41 19 17.66 17.85 18.13L18.37 18.5H20ZM8.92 16.5H7.42V10.7L5.62 11.26V10.03L8.76 8.91H8.92V16.5Z"
                                    fill="black"
                                />
                            </svg>
                            <h4>{Object.keys(mocsummarry).length != 0 ? mocsummarry['moctotalduration'][0]['totalduration'] : '0'}</h4>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card
                        style={{
                            position: 'relative',
                            padding: '1%',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#ffff'
                        }}
                    >
                        <h3 style={{ margin: '0.2rem' }}>MOC Total SDR</h3>
                        <div
                            style={{
                                width: '95%',
                                height: '1.5px',
                                backgroundColor: '#6898ce',
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginLeft: '0.5rem'
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: '4.5vh',
                                marginBottom: '0.5rem'
                            }}
                        >
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13 9.5V4L18.5 9.5M6 2.5C4.89 2.5 4 3.39 4 4.5V20.5C4 21.0304 4.21071 21.5391 4.58579 21.9142C4.96086 22.2893 5.46957 22.5 6 22.5H18C18.5304 22.5 19.0391 22.2893 19.4142 21.9142C19.7893 21.5391 20 21.0304 20 20.5V8.5L14 2.5H6Z"
                                    fill="black"
                                />
                            </svg>
                            <h4>{Object.keys(mocsummarry).length != 0 ? mocsummarry['MOCTOTALSDR'][0]['MOCTOTALSDR'] : '0'}</h4>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card style={{ backgroundColor: '#ffff' }}>
                        <h3 style={{ margin: '0.2rem' }}>Country</h3>
                        <div
                            style={{
                                width: '95%',
                                height: '1.5px',
                                backgroundColor: '#6898ce',
                                marginTop: '10px',
                                marginBottom: '0px',
                                marginLeft: '0.5rem'
                            }}
                        />
                        <FormControl size="small" fullWidth style={{ width: '95%', margin: '0.5rem' }}>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={country}
                                label="Country"
                                onChange={handleCountry}
                            >
                                {countrymenu.map((country) => (
                                    <MenuItem value={country['country']}>{country['country']}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} xs={12} sx={{ mt: -2, ml: 0 }}>
                <Grid item xs={4}>
                    <Card
                        style={{
                            position: 'relative',
                            marginBottom: '5%',
                            padding: '1%',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#ffff'
                        }}
                    >
                        <h3 style={{ margin: '0.2rem' }}>MOC Count</h3>
                        <div
                            style={{
                                width: '95%',
                                height: '1.5px',
                                backgroundColor: '#6898ce',
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginLeft: '0.5rem'
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: '4.5vh',
                                marginBottom: '0.5rem'
                            }}
                        >
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13 9.5V4L18.5 9.5M6 2.5C4.89 2.5 4 3.39 4 4.5V20.5C4 21.0304 4.21071 21.5391 4.58579 21.9142C4.96086 22.2893 5.46957 22.5 6 22.5H18C18.5304 22.5 19.0391 22.2893 19.4142 21.9142C19.7893 21.5391 20 21.0304 20 20.5V8.5L14 2.5H6Z"
                                    fill="black"
                                />
                            </svg>
                            <h4>{Object.keys(mocsummarry).length != 0 ? mocsummarry['MOCCOUNT'][0]['MOCCOUNT'] : '0'}</h4>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card
                        style={{
                            position: 'relative',
                            padding: '1%',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#ffff'
                        }}
                    >
                        <h3 style={{ margin: '0.2rem' }}>TAPIN File Count</h3>
                        <div
                            style={{
                                width: '95%',
                                height: '1.5px',
                                backgroundColor: '#6898ce',
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginLeft: '0.5rem'
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: '4.5vh',
                                marginBottom: '0.5rem'
                            }}
                        >
                            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 12H2C2 13.08 3.37 14 5 14C6.63 14 8 13.08 8 12C8 10.9 6.96 10.5 4.76 9.97C2.64 9.44 0 8.78 0 6C0 4.21 1.47 2.69 3.5 2.18V0H6.5V2.18C8.53 2.69 10 4.21 10 6H8C8 4.92 6.63 4 5 4C3.37 4 2 4.92 2 6C2 7.1 3.04 7.5 5.24 8.03C7.36 8.56 10 9.22 10 12C10 13.79 8.53 15.31 6.5 15.82V18H3.5V15.82C1.47 15.31 0 13.79 0 12Z"
                                    fill="black"
                                />
                            </svg>
                            <h4>{Object.keys(mocsummarry).length != 0 ? mocsummarry['tap'] : '0'}</h4>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card style={{ backgroundColor: '#ffff' }}>
                        <h3 style={{ margin: '0.2rem' }}>TADIG</h3>
                        <div
                            style={{
                                width: '95%',
                                height: '1.5px',
                                backgroundColor: '#6898ce',
                                marginTop: '10px',
                                marginBottom: '0px',
                                marginLeft: '0.5rem'
                            }}
                        />
                        <FormControl size="small" fullWidth style={{ width: '95%', margin: '0.5em' }} disabled={dis}>
                            <InputLabel id="demo-simple-select-label">TADIG</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tadig}
                                label="TADIG"
                                onChange={handleTadig}
                            >
                                {tadigmenu.map((tadig1) => (
                                    <MenuItem value={tadig1.tadig}>{tadig1.tadig}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} xs={12} sx={{ mt: -2, ml: 0 }}>
                <Grid item xs={6}>
                    <TopOperator data2={topoperatordata} label2={topoperatorlabel} />
                </Grid>
                <Grid item xs={6}>
                    <TotalDuration />
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} xs={12} sx={{ mt: -2, ml: 0 }}>
                <Grid item xs={12}>
                    <TapinTrend data1={trenddata} data2={trenddata2} label2={trendlabel} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Index;
