import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import axios from 'axios';
import CommercialChart from './bar-data/CommercialChart';
import UnderTestingChart from './bar-data/UnderTestingChart';
import CompletedChart from './bar-data/CompletedChart';
import LaunchedChart from './bar-data/LaunchedChart';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
    const [btnval, setBtnval] = useState('1');
    function handleClick() {
        setBtnval('1');
    }
    function handleClick1() {
        setBtnval('2');
    }
    function handleClick2() {
        setBtnval('3');
    }
    function handleClick3() {
        setBtnval('4');
    }
    function handleClick4() {
        setBtnval('5');
    }

    return (
        <>
            <Card style={{ background: '#FFFFFF' }}>
                {btnval == '1' ? (
                    <CommercialChart />
                ) : btnval == '2' ? (
                    <UnderTestingChart />
                ) : btnval == '3' ? (
                    <CompletedChart />
                ) : btnval == '4' ? (
                    <LaunchedChart />
                ) : (
                    <CommercialChart />
                )}
                {/* <CommercialChart /> */}
                {/* <Grid item xs={12} style={{ margin: '1em' }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={2.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" onClick={handleClick} style={{ fontSize: '0.7em', width: '7vw' }}>
                                Total Reviews
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={2.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" onClick={handleClick1} style={{ fontSize: '0.7em', width: '7vw' }}>
                                Under Testing
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={2.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" onClick={handleClick2} style={{ fontSize: '0.7em', width: '7vw' }}>
                                Completed
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={2.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" onClick={handleClick3} style={{ fontSize: '0.7em', width: '7vw' }}>
                                Launched
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={2.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" onClick={handleClick4} style={{ fontSize: '0.7em', width: '7vw' }}>
                                Partner Billing
                            </Button>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Card>

            {/* <Bar
                data={{
                    // Name of the variables on x-axies for each bar
                    labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    datasets: [
                        {
                            label: 'Commercial Review',
                            data: [jan, feb, mar, apr, may, jun, jly, aug, sept, oct, nov, dec],
                            backgroundColor: ['#7294d2']
                        },
                        {
                            label: 'Under Testing',
                            data: [jan1, feb1, mar1, apr1, may1, jun1, jly1, aug1, sept1, oct1, nov1, dec1],
                            backgroundColor: ['#9cbef2']
                        },
                        {
                            label: 'Testing Completed',
                            data: [jan1, feb1, mar1, apr1, may1, jun1, jly1, aug1, sept1, oct1, nov1, dec1],
                            backgroundColor: ['#203864']
                        },
                        {
                            label: 'Launched',
                            data: [jan1, feb1, mar1, apr1, may1, jun1, jly1, aug1, sept1, oct1, nov1, dec1],
                            backgroundColor: ['#5579c6']
                        },
                        {
                            label: 'Partner Billing',
                            data: [jan1, feb1, mar1, apr1, may1, jun1, jly1, aug1, sept1, oct1, nov1, dec1],
                            backgroundColor: ['#625bb0']
                        }
                    ]
                }}
                // Height of graph
                height={400}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Month Wise Chart'
                        }
                    },
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    // The y-axis value will start from zero
                                    beginAtZero: true
                                }
                            }
                        ]
                    },
                    legend: {
                        labels: {
                            fontSize: 15
                        }
                    }
                }}
            /> */}
        </>
    );
};

// TotalGrowthBarChart.propTypes = {
//     isLoading: PropTypes.bool
// };

export default TotalGrowthBarChart;
