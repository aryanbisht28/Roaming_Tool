import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import Card from '@mui/material/Card';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Pie } from 'react-chartjs-2';
import Header from 'layout/MainLayout/Header';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import 'chartjs-plugin-datalabels';
import ActualVTarget from './ActualVTarget';
import DoughnutChart from './DoughnutChart';
import Churn from './Churn';
import Arpu from './Arpu';
import GrossRevenue from './GrossRevenue';
import RevenueContri from './RevenueContri';
import Subscriber from './Subscriber';

const TapInDashboard = () => {
    const [Operator, setOperator] = useState('');
    const [Period, setPeriod] = useState('');

    const handleOperator = (event) => {
        setOperator(event.target.value);
    };

    const handlePeriod = (event) => {
        setPeriod(event.target.value);
    };

    return (
        <>
            <div style={{ marginTop: '-115px' }}>
                <Header title={'Chargeable Event Generation'} subtitle={'Tap-Out Dashboard'} />

                <Grid container spacing={gridSpacing}>
                    <Grid item xs={8.8}>
                        <div
                            style={{
                                margin: '.5em',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <h2> Daily Kpi Dashbaord</h2>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <div style={{ minWidth: 120, margin: '.5em' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Operator</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Operator}
                                        label="Operator"
                                        onChange={handleOperator}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{ minWidth: 120, margin: '.5em' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Period</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Period}
                                        label="Period"
                                        onChange={handlePeriod}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={3.2}>
                        <Card style={{ height: '80vh', backgroundColor: '#ffff' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '30%', margin: '0.5rem' }}>
                                    <h3 style={{ margin: '0' }}>MoU By Circle</h3>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '1.5px',
                                            backgroundColor: '#6898ce',
                                            marginTop: '10px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <DoughnutChart />
                                </div>
                                <div style={{ height: '17.5%', margin: '0.5rem' }}>
                                    <h3 style={{ margin: '0' }}>Revenue</h3>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '1.5px',
                                            backgroundColor: '#6898ce',
                                            marginTop: '10px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.45 15.68L22 7.81V19.5V21.5H2V3.5H4V16.04L9.5 6.5L16 10.28L20.24 2.95L21.97 3.95L16.74 13L10.23 9.25L4.31 19.5H6.57L10.96 11.94L17.45 15.68Z"
                                                fill="black"
                                            />
                                        </svg>
                                        <h4>16128%</h4>
                                    </div>
                                </div>
                                <div style={{ height: '17.5%', margin: '0.5rem' }}>
                                    <h3 style={{ margin: '0' }}>Subscriber</h3>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '1.5px',
                                            backgroundColor: '#6898ce',
                                            marginTop: '10px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 6C12.9283 6 13.8185 6.36875 14.4749 7.02513C15.1313 7.6815 15.5 8.57174 15.5 9.5C15.5 10.4283 15.1313 11.3185 14.4749 11.9749C13.8185 12.6313 12.9283 13 12 13C11.0717 13 10.1815 12.6313 9.52513 11.9749C8.86875 11.3185 8.5 10.4283 8.5 9.5C8.5 8.57174 8.86875 7.6815 9.52513 7.02513C10.1815 6.36875 11.0717 6 12 6ZM5 8.5C5.56 8.5 6.08 8.65 6.53 8.92C6.38 10.35 6.8 11.77 7.66 12.88C7.16 13.84 6.16 14.5 5 14.5C4.20435 14.5 3.44129 14.1839 2.87868 13.6213C2.31607 13.0587 2 12.2956 2 11.5C2 10.7044 2.31607 9.94129 2.87868 9.37868C3.44129 8.81607 4.20435 8.5 5 8.5ZM19 8.5C19.7956 8.5 20.5587 8.81607 21.1213 9.37868C21.6839 9.94129 22 10.7044 22 11.5C22 12.2956 21.6839 13.0587 21.1213 13.6213C20.5587 14.1839 19.7956 14.5 19 14.5C17.84 14.5 16.84 13.84 16.34 12.88C17.2 11.77 17.62 10.35 17.47 8.92C17.92 8.65 18.44 8.5 19 8.5ZM5.5 18.75C5.5 16.68 8.41 15 12 15C15.59 15 18.5 16.68 18.5 18.75V20.5H5.5V18.75ZM0 20.5V19C0 17.61 1.89 16.44 4.45 16.1C3.86 16.78 3.5 17.72 3.5 18.75V20.5H0ZM24 20.5H20.5V18.75C20.5 17.72 20.14 16.78 19.55 16.1C22.11 16.44 24 17.61 24 19V20.5Z"
                                                fill="black"
                                            />
                                        </svg>

                                        <h4>958357</h4>
                                    </div>
                                </div>
                                <div style={{ height: '17.5%', margin: '0.5rem' }}>
                                    <h3 style={{ margin: '0' }}>Voice OG Call</h3>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '1.5px',
                                            backgroundColor: '#6898ce',
                                            marginTop: '10px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.62 11.29C8.06 14.12 10.38 16.44 13.21 17.88L15.41 15.68C15.69 15.4 16.08 15.32 16.43 15.43C17.55 15.8 18.75 16 20 16C20.2652 16 20.5196 16.1054 20.7071 16.2929C20.8946 16.4804 21 16.7348 21 17V20.5C21 20.7652 20.8946 21.0196 20.7071 21.2071C20.5196 21.3946 20.2652 21.5 20 21.5C15.4913 21.5 11.1673 19.7089 7.97918 16.5208C4.79107 13.3327 3 9.00868 3 4.5C3 4.23478 3.10536 3.98043 3.29289 3.79289C3.48043 3.60536 3.73478 3.5 4 3.5H7.5C7.76522 3.5 8.01957 3.60536 8.20711 3.79289C8.39464 3.98043 8.5 4.23478 8.5 4.5C8.5 5.75 8.7 6.95 9.07 8.07C9.18 8.42 9.1 8.81 8.82 9.09L6.62 11.29Z"
                                                fill="black"
                                            />
                                        </svg>

                                        <h4>21362</h4>
                                    </div>
                                </div>
                                <div style={{ height: '17.5%', margin: '0.5rem' }}>
                                    <h3 style={{ margin: '0' }}>Data Users</h3>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '1.5px',
                                            backgroundColor: '#6898ce',
                                            marginTop: '10px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M12 21.5L15.6 16.7C14.6 15.95 13.35 15.5 12 15.5C10.65 15.5 9.4 15.95 8.4 16.7L12 21.5ZM12 3.5C7.95 3.5 4.21 4.84 1.2 7.1L3 9.5C5.5 7.62 8.62 6.5 12 6.5C15.38 6.5 18.5 7.62 21 9.5L22.8 7.1C19.79 4.84 16.05 3.5 12 3.5ZM12 9.5C9.3 9.5 6.81 10.39 4.8 11.9L6.6 14.3C8.1 13.17 9.97 12.5 12 12.5C14.03 12.5 15.9 13.17 17.4 14.3L19.2 11.9C17.19 10.39 14.7 9.5 12 9.5Z"
                                                fill="black"
                                            />
                                        </svg>

                                        <h4>420146</h4>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={8.8}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '33.33%' }}>
                                    <ActualVTarget />
                                </div>
                                <div style={{ marginLeft: '0.7rem', width: '33.33%' }}>
                                    <Churn />
                                </div>
                                <div style={{ marginLeft: '0.7rem', width: '33.33%' }}>
                                    <Arpu />
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>
                                    <GrossRevenue />
                                </div>
                                <div style={{ marginLeft: '0.7rem', width: '50%' }}>
                                    <RevenueContri />
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>
                                    <Subscriber />
                                </div>
                                <div style={{ marginLeft: '0.7rem', width: '50%' }}>
                                    <RevenueContri />
                                </div>
                            </div>
                        </div>
                    </Grid>

                    {/* <Grid item xs={2.9}>
                        <Card style={{ backgroundColor: '#ffff' }}>
                            <ActualVTarget />
                        </Card>
                    </Grid>
                    <Grid item xs={2.9}>
                        <Card style={{ backgroundColor: '#ffff' }}>
                            <Churn />
                        </Card>
                    </Grid>
                    <Grid item xs={2.9}>
                        <Card style={{ backgroundColor: '#ffff' }}>
                            <Arpu />
                        </Card>
                    </Grid> */}
                </Grid>
            </div>
        </>
    );
};

export default TapInDashboard;
