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
import 'chartjs-plugin-datalabels';
import DataCard from './DataCard';
import MocTrending from './MOC_Trending/index';
import MTC_Trending from './MTC_Trending/index';
import SMSMO from './SMSMO_Trending/index';
import GPRS from './GPRS_Trending/index';

const TapInDashboard = () => {
    const [Operator, setOperator] = useState('MOC Trending');
    const [Period, setPeriod] = useState('');

    const handleOperator = (event) => {
        setOperator(event.target.value);
    };

    const handlePeriod = (event) => {
        setPeriod(event.target.value);
    };

    return (
        <>
            <Box style={{ marginTop: '-100px', marginBottom: '-115px', overflowY: 'hidden' }}>
                <Header title={'Chargeable Event Generation'} subtitle={'Tap-In Dashboard'} />
                <Grid container spacing={gridSpacing} xs={12}>
                    <Grid container spacing={gridSpacing} sx={{ mt: 1, ml: 0 }}>
                        <Grid item xs={3}>
                            <Card style={{ backgroundColor: '#ffff', marginBottom: '0.5em' }}>
                                <FormControl fullWidth style={{ width: '95%', margin: '0.5rem' }}>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Operator}
                                        label="Type"
                                        onChange={handleOperator}
                                    >
                                        <MenuItem value={'MOC Trending'}>MOC Trending</MenuItem>
                                        <MenuItem value={'MTC Trending'}>MTC Trending</MenuItem>
                                        <MenuItem value={'SMSMO Trending'}>SMSMO Trending</MenuItem>
                                        <MenuItem value={'GPRS Trending'}>GPRS Trending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Card>
                            <DataCard />
                        </Grid>
                        <Grid item xs={9}>
                            {Operator == 'MOC Trending' ? (
                                <MocTrending />
                            ) : Operator == 'MTC Trending' ? (
                                <MTC_Trending />
                            ) : Operator == 'SMSMO Trending' ? (
                                <SMSMO />
                            ) : (
                                <GPRS />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default TapInDashboard;
