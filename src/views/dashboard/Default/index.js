import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import Card from '@mui/material/Card';
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CompletedMap from '../Default/map-data/CompletedMap';
import LaunchedMap from './map-data/LaunchedMap';
import ReviewMap from './map-data/ReviewMap';
import TestingMap from './map-data/TestingMap';
import { Pie } from 'react-chartjs-2';
// import React from "react";
import Header from 'layout/MainLayout/Header';
import StackedChart from './StackedChart';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [dataa, setDataa] = useState([]);
    const [dataa1, setDataa1] = useState([]);
    const [dataa2, setDataa2] = useState([]);
    const [label, setLabel] = useState([]);
    const [label1, setLabel1] = useState([]);
    const [label2, setLabel2] = useState([]);
    const [btnval, setBtnval] = useState('1');
    const [pie, setPie] = useState('2023');
    const [bar, setBar] = useState('Under Testing');

    const handleChange = (event) => {
        setBar(event.target.value);
    };

    const handleChange1 = (event) => {
        setPie(event.target.value);
    };

    useEffect(() => {
        const url = 'http://localhost:8080/ppini';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setData1(response.data.length);
        });
    }, []);

    useEffect(() => {
        const url = 'http://localhost:8080/ppini/service';
        axios.get(url).then((response) => {
            console.log('Get req at pie', response.data);
            setDataa(response.data);
            let label = response.data.map((d) => d['_id']);
            setLabel(label);
            console.log('label', label);
        });
    }, []);

    useEffect(() => {
        const url = 'http://localhost:8080/subs/service';
        axios.get(url).then((response) => {
            console.log('Get req at pie', response.data);
            setDataa1(response.data);
            let label1 = response.data.map((d) => d['_id']);
            setLabel1(label1);
            console.log('label1', label1);
        });
    }, []);

    useEffect(() => {
        const url = 'http://localhost:8080/ppini/tservice';
        axios.get(url).then((response) => {
            console.log('Get req at pie', response.data);
            setDataa2(response.data);
            let label1 = response.data.map((d) => d['_id']);
            setLabel2(label1);
            console.log('label2', label2);
        });
    }, []);

    const options3 = {
        plugins: {
            title: {
                display: true,
                text: 'Testing Services Summary',
                font: {
                    size: 15
                },
                color: '#000000'
            },
            legend: {
                labels: {
                    color: '#000000',
                    font: {
                        size: 10
                    },
                    usePointStyle: true,
                    boxWidth: 6
                }
            },
            datalabels: {
                display: true,
                // color: 'black',
                align: 'center',
                // padding: 2,
                labels: {
                    // padding: 20,
                    // title: {
                    //     font: {
                    //         // fontSize: '1.5rem',
                    //         weight: 'bold'
                    //     }
                    // },
                    value: {
                        color: '#ffff'
                    }
                },
                formatter: function (value) {
                    return '\n' + value;
                }
            }
        },
        responsive: true
    };

    const options1 = {
        plugins: {
            title: {
                display: true,
                text: 'Completed Services Summary',
                font: {
                    size: 15
                },
                color: '#000000'
            },
            legend: {
                labels: {
                    color: '#000000',
                    font: {
                        size: 10
                    },
                    usePointStyle: true,
                    boxWidth: 6
                }
            },
            datalabels: {
                display: true,
                labels: {
                    title: {
                        font: {
                            fontSize: '1.5rem',
                            weight: 'bold'
                        }
                    },
                    value: {
                        color: '#ffff'
                    }
                },
                formatter: function (value) {
                    return '\n' + value;
                }
            }
        },
        responsive: true
    };

    const options2 = {
        plugins: {
            title: {
                display: true,
                text: 'Launched Services Summary',
                font: {
                    size: 15
                },
                color: '#000000'
            },
            legend: {
                labels: {
                    color: '#000000',
                    font: {
                        size: 10
                    },
                    usePointStyle: true,
                    boxWidth: 6
                }
            },
            datalabels: {
                display: true,
                color: 'black',
                // align: 'end',
                // padding: {
                //     right: 2
                // },
                labels: {
                    // padding: 10,
                    title: {
                        font: {
                            weight: 'bold'
                        }
                    },
                    value: {
                        color: '#ffff'
                    }
                },
                formatter: function (value) {
                    return '\n' + value;
                }
            }
        },
        responsive: true
    };
    // const dat = [['Service', 'Count'], [('GPRS', 4)], ['3G', 2], ['GSM', 4], ['VOLTE', 2]];

    const dat = {
        labels: label,
        // labels: [dataa.map((d) => d._id)],
        datasets: [
            {
                // label: 'Values',
                data: dataa.map((d) => d.count),
                backgroundColor: ['#3063ee', '#749cec', '#3d2564', '#8860ae', '#d0c1e2', '#342c3c', '#09a4b4'],
                borderColor: ['#ffff'],
                borderWidth: 2,
                hoverOffset: 4
            }
        ]
    };

    const dat1 = {
        labels: label2,
        // labels: [dataa.map((d) => d._id)],
        datasets: [
            {
                // label: 'Values',
                data: dataa2.map((d) => d.count),
                backgroundColor: ['#3063ee', '#749cec', '#3d2564', '#8860ae', '#d0c1e2', '#342c3c', '#09a4b4'],
                borderColor: ['#ffff'],
                borderWidth: 2,
                hoverOffset: 4
            }
        ]
    };

    const dat2 = {
        labels: label1,
        // labels: [dataa.map((d) => d._id)],
        datasets: [
            {
                // label: 'Values',
                data: dataa1.map((d) => d.count),
                backgroundColor: ['#3063ee', '#749cec', '#3d2564', '#8860ae', '#d0c1e2', '#342c3c', '#09a4b4'],
                borderColor: ['#ffff'],
                borderWidth: 2,
                hoverOffset: 4
            }
        ]
    };

    useEffect(() => {
        const url = 'http://localhost:8080/addCr/count';
        axios.get(url).then((response) => {
            console.log('Get req main dash', response.data[0].createdAt);
            setData(response.data);
        });
    }, []);

    // useEffect(() => {
    //     const url = 'http://localhost:8080/ppini/count';
    //     axios.get(url).then((response) => {
    //         console.log('Get req main dash', response.data[0].createdAt);
    //         setData1(response.data);
    //     });
    // }, []);

    useEffect(() => {
        const url = 'http://localhost:8080/testing/join';
        axios.get(url).then((response) => {
            console.log('Get req completed', response);
            setData2(response.data.length);
        });
    }, []);

    // useEffect(() => {
    //     const url = 'http://localhost:8080/ppini/tcount';
    //     axios.get(url).then((response) => {
    //         console.log('Get req main dash tcount', response.data[0].createdAt);
    //         setData2(response.data);
    //     });
    // }, []);

    // console.log(data2);
    useEffect(() => {
        const url = 'http://localhost:8080/subs/count';
        axios.get(url).then((response) => {
            // console.log('Get req main dash', response.data[0]);
            setData3(response.data[0]['createdAt']);
        });
    }, []);

    // console.log('data2', data2[0].totalCount);

    useEffect(() => {
        setLoading(false);
    }, []);

    const optionspie = {
        title: 'Under Testing'
    };

    return (
        <>
            <div>
                <Box style={{ marginTop: '-105px' }}>
                    <Header title={'Dasboard'} subtitle={''} />
                    <Box component="main" sx={{ flexGrow: 0.2, mt: 6, ml: 3, width: '100%' }} className="container">
                        <Grid container spacing={gridSpacing} xs={12}>
                            <Grid container spacing={gridSpacing} style={{ marginTop: '-3em' }}>
                                <Grid item xs={2.4}>
                                    <Link to="/pages/CommercialReview/ViewReview" style={{ textDecoration: 'none' }}>
                                        <EarningCard
                                            isLoading={isLoading}
                                            name="Commercial Review"
                                            value={data.length > 0 ? data.map((d) => d.createdAt) : 0}
                                            img={
                                                <svg
                                                    width="44"
                                                    height="32"
                                                    viewBox="0 0 44 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M21.7284 6.90356C24.3097 5.4369 28.0482 4.90356 31.5196 4.90356C34.1009 4.90356 36.8425 5.1969 39.1212 5.9569C40.4207 6.3969 41.293 7.34356 41.293 8.42356V23.4636C41.293 25.2102 39.1212 26.4902 36.8781 26.0502C35.1335 25.7169 33.282 25.5702 31.5018 25.5702C28.7247 25.5702 25.7695 25.9036 23.384 26.7969C22.3337 27.1969 21.1231 27.1969 20.055 26.7969C17.6695 25.9169 14.7143 25.5702 11.9372 25.5702C10.157 25.5702 8.30556 25.7169 6.56094 26.0502C4.31786 26.4769 2.146 25.1969 2.146 23.4636V8.42356C2.146 7.34356 3.0183 6.3969 4.31786 5.9569C6.61435 5.1969 9.35589 4.90356 11.9372 4.90356C15.4086 4.90356 19.1471 5.4369 21.7284 6.90356ZM11.9283 7.33325C14.3138 7.33325 17.5004 7.87992 19.9393 8.65325V23.9866C17.5004 23.2133 14.3138 22.6666 11.9283 22.6666C9.79204 22.6666 7.65578 22.8666 5.69754 23.3333V7.99992C7.65578 7.53325 9.79204 7.33325 11.9283 7.33325ZM37.7415 23.3333C35.7833 22.8666 33.647 22.6666 31.5107 22.6666C29.1252 22.6666 25.9386 23.2133 23.4997 23.9866V8.65325C25.9386 7.86658 29.1252 7.33325 31.5107 7.33325C33.647 7.33325 35.7833 7.53325 37.7415 7.99992V23.3333Z"
                                                        fill="#0C233C"
                                                    />
                                                    <path
                                                        d="M31.5107 12.6666C33.0773 12.6666 34.5905 12.7866 35.9613 13.0133V10.9866C34.5549 10.7866 33.0417 10.6666 31.5107 10.6666C29.232 10.6666 27.1314 10.8799 25.28 11.2933V13.3866C27.0424 12.9199 29.1608 12.6666 31.5107 12.6666Z"
                                                        fill="#0C233C"
                                                    />
                                                    <path
                                                        d="M31.5107 16.2135C33.0773 16.2135 34.5905 16.3335 35.9613 16.5601V14.5335C34.5549 14.3335 33.0417 14.2135 31.5107 14.2135C29.232 14.2135 27.1314 14.4268 25.28 14.8401V16.9335C27.0424 16.4801 29.1608 16.2135 31.5107 16.2135Z"
                                                        fill="#0C233C"
                                                    />
                                                    <path
                                                        d="M31.5107 19.7734C33.0773 19.7734 34.5905 19.8934 35.9613 20.12V18.0934C34.5549 17.8934 33.0417 17.7734 31.5107 17.7734C29.232 17.7734 27.1314 17.9867 25.28 18.4V20.4934C27.0424 20.0267 29.1608 19.7734 31.5107 19.7734Z"
                                                        fill="#0C233C"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </Link>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <Link to="/pages/PatnerProvisioning/view-intialization" style={{ textDecoration: 'none' }}>
                                        <EarningCard
                                            isLoading={isLoading}
                                            name="Under Testing"
                                            value={data1}
                                            img={
                                                <svg
                                                    width="38"
                                                    height="32"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M3 7C3 6.448 3.448 6 4 6C4.552 6 5 6.448 5 7C5 7.552 4.552 8 4 8C3.448 8 3 7.552 3 7ZM3 12C3 11.448 3.448 11 4 11C4.552 11 5 11.448 5 12C5 12.552 4.552 13 4 13C3.448 13 3 12.552 3 12ZM4 16C3.448 16 3 16.448 3 17C3 17.552 3.448 18 4 18C4.552 18 5 17.552 5 17C5 16.448 4.552 16 4 16ZM7.9355 11H20.0645C20.5795 11 21.0005 11.421 21.0005 11.936V12.064C21.0005 12.579 20.5795 13 20.0645 13H7.9355C7.4205 13 7.0005 12.579 7.0005 12.064V11.936C7.0005 11.421 7.4205 11 7.9355 11ZM20.0645 16H7.9355C7.4205 16 7.0005 16.421 7.0005 16.936V17.064C7.0005 17.579 7.4205 18 7.9355 18H20.0645C20.5795 18 21.0005 17.579 21.0005 17.064V16.936C21.0005 16.421 20.5795 16 20.0645 16ZM7.9355 6H20.0645C20.5795 6 21.0005 6.421 21.0005 6.936V7.064C21.0005 7.579 20.5795 8 20.0645 8H7.9355C7.4205 8 7.0005 7.579 7.0005 7.064V6.936C7.0005 6.421 7.4205 6 7.9355 6Z"
                                                        fill="#1E1E1E"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </Link>
                                </Grid>

                                <Grid item xs={2.4}>
                                    <Link to="/pages/PatnerProvisioning/completed" style={{ textDecoration: 'none' }}>
                                        <EarningCard
                                            isLoading={isLoading}
                                            name="Testing Completed"
                                            value={data2}
                                            img={
                                                <svg
                                                    width="38"
                                                    height="32"
                                                    viewBox="0 0 44 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M34.1813 17.1114C34.1813 16.3754 34.9788 15.7781 35.9615 15.7781C36.9442 15.7781 37.7417 16.3754 37.7417 17.1114V24.5327C37.7417 26.4447 35.6642 28.0007 33.1131 28.0007H10.3263C7.77527 28.0007 5.69775 26.4447 5.69775 24.5327V7.4674C5.69775 5.5554 7.77527 4.00073 10.3263 4.00073H27.3577C28.3404 4.00073 29.1379 4.59673 29.1379 5.33407C29.1379 6.07007 28.3404 6.6674 27.3577 6.6674H10.3263C9.73707 6.6674 9.25819 7.02607 9.25819 7.4674V24.5327C9.25819 24.9741 9.73707 25.3341 10.3263 25.3341H33.1131C33.7024 25.3341 34.1813 24.9741 34.1813 24.5327V17.1114ZM16.9302 14.5954C17.6423 14.0861 18.7674 14.1074 19.4475 14.6394L22.1267 16.7434L32.9024 8.40607C33.5842 7.87807 34.7111 7.86207 35.4196 8.3754C36.1263 8.8874 36.1441 9.7314 35.4605 10.2607L23.396 19.5941C23.0613 19.8541 22.6002 20.0007 22.1178 20.0007H22.1107C21.6264 19.9994 21.1636 19.8501 20.8289 19.5874L16.8715 16.4807C16.1914 15.9474 16.2199 15.1034 16.9302 14.5954Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </Link>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Link to="/pages/SubscriberProvisioning/view" style={{ textDecoration: 'none' }}>
                                        <EarningCard
                                            isLoading={isLoading}
                                            name="Launched"
                                            value={data3.len > 0 ? data3 : 0}
                                            img={
                                                <svg
                                                    width="38"
                                                    height="32"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M10.7969 13.2129L11.5109 11.4709L13.2029 10.7869L12.4889 12.5289L10.7969 13.2129ZM15.6829 8.3179C15.4089 8.0279 14.9789 7.9159 14.5839 8.0719L10.3709 9.7739C10.1209 9.8749 9.9219 10.0719 9.8199 10.3219L8.0749 14.5799C7.9269 14.9409 8.0139 15.3309 8.2529 15.6079C8.2609 15.6179 8.2669 15.6309 8.2759 15.6419C8.2919 15.6589 8.3109 15.6729 8.3289 15.6899C8.5169 15.8829 8.7719 15.9999 9.0419 15.9999C9.1669 15.9999 9.2939 15.9769 9.4159 15.9279L13.6289 14.2269C13.8789 14.1249 14.0779 13.9279 14.1799 13.6779L15.9249 9.4199C16.0869 9.0259 15.9749 8.5939 15.6829 8.3179V8.3179ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2"
                                                        fill="#1E1E1E"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </Link>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <EarningCard
                                        isLoading={isLoading}
                                        name="Partner Billing"
                                        value="0"
                                        img={
                                            <svg width="38" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M10 5.5C10 5.224 10.224 5 10.5 5H13.5C13.776 5 14 5.224 14 5.5V7H10V5.5ZM9 19H15V9H9V19ZM20 18C20 18.551 19.551 19 19 19H17V9H19C19.551 9 20 9.449 20 10V18ZM4 10V18C4 18.551 4.449 19 5 19H7V9H5C4.449 9 4 9.449 4 10ZM19 7H16V5.5C16 4.122 14.878 3 13.5 3H10.5C9.122 3 8 4.122 8 5.5V7H5C3.346 7 2 8.346 2 10V18C2 19.654 3.346 21 5 21H19C20.654 21 22 19.654 22 18V10C22 8.346 20.654 7 19 7V7Z"
                                                    fill="#1E1E1E"
                                                />
                                            </svg>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={gridSpacing} xs={12}>
                            <Grid container spacing={gridSpacing} sx={{ mt: 2 }}>
                                <Grid item xs={8}>
                                    <Card style={{ background: 'white', height: '100%' }}>
                                        <h4
                                            style={{
                                                color: '000000',
                                                fontSize: '1.2rem',
                                                fontWeight: '500',
                                                margin: '0.5rem 0rem 0rem 1rem',
                                                padding: '0'
                                            }}
                                        >
                                            Month Wise Data
                                        </h4>
                                        <StackedChart />
                                    </Card>
                                </Grid>
                                <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Card style={{ background: 'white', width: '100%' }}>
                                        <FormControl fullWidth style={{ margin: '1.3rem', width: '90%' }}>
                                            <InputLabel>Year</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={pie}
                                                label="Year"
                                                onChange={handleChange1}
                                                defaultValue={'2023'}
                                            >
                                                <MenuItem value={'2019'}>2019</MenuItem>
                                                <MenuItem value={'2020'}>2020</MenuItem>
                                                <MenuItem value={'2021'}>2021</MenuItem>
                                                <MenuItem value={'2022'}>2022</MenuItem>
                                                <MenuItem value={'2023'}>2023</MenuItem>
                                                <MenuItem value={'2024'}>2024</MenuItem>
                                                <MenuItem value={'2025'}>2025</MenuItem>
                                                <MenuItem value={'2026'}>2026</MenuItem>
                                                <MenuItem value={'2027'}>2027</MenuItem>
                                                <MenuItem value={'2028'}>2028</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Card>
                                    <Card style={{ background: 'white', width: '100%' }}>
                                        <FormControl fullWidth style={{ margin: '1.3rem', width: '90%' }}>
                                            <InputLabel>Data</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={bar}
                                                label="Data"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'Under Testing'}>Under Testing</MenuItem>
                                                <MenuItem value={'Completed'}>Completed</MenuItem>
                                                <MenuItem value={'Launched'}>Launched</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={gridSpacing} xs={12}>
                            <Grid container spacing={gridSpacing} sx={{ mt: 2 }}>
                                <Grid item xs={8}>
                                    <Card style={{ background: 'white', marginTop: '-0.5rem', width: '100%', height: '20em' }}>
                                        <h4
                                            style={{
                                                color: '000000',
                                                fontSize: '1.2rem',
                                                fontWeight: '400',
                                                margin: '-1.2rem 0rem 0rem 1rem',
                                                padding: '0rem'
                                            }}
                                        >
                                            {bar == 'Under Testing' ? (
                                                <h4> Country Wise Testing Data </h4>
                                            ) : bar == 'Completed' ? (
                                                <h4> Country Wise Testing Completed Data </h4>
                                            ) : bar == 'Launched' ? (
                                                <h4> Country Wise Launched Data </h4>
                                            ) : (
                                                <h4> Country Wise Testing Data </h4>
                                            )}
                                        </h4>
                                        {bar == 'Under Testing' ? (
                                            <TestingMap />
                                        ) : bar == 'Completed' ? (
                                            <CompletedMap />
                                        ) : bar == 'Launched' ? (
                                            <LaunchedMap />
                                        ) : (
                                            <TestingMap />
                                        )}
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card
                                        style={{
                                            background: 'white',
                                            marginTop: '-0.5rem',
                                            width: '100%',
                                            height: '20em',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{ height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {bar == 'Under Testing' ? (
                                                <Pie
                                                    style={{
                                                        marginLeft: '1.5em',
                                                        marginRight: '1.5em',
                                                        height: '90%'
                                                        // width: '70%'
                                                    }}
                                                    data={dat}
                                                    options={options3}
                                                />
                                            ) : bar == 'Completed' ? (
                                                <Pie
                                                    style={{
                                                        marginTop: '1.5em',
                                                        marginLeft: '1.5em',
                                                        marginRight: '1.5em',
                                                        height: '90%'
                                                    }}
                                                    data={dat1}
                                                    options={options1}
                                                />
                                            ) : bar == 'Launched' ? (
                                                <Pie
                                                    style={{
                                                        marginTop: '1.5em',
                                                        marginLeft: '1.5em',
                                                        marginRight: '1.5em',
                                                        height: '90%'
                                                    }}
                                                    data={dat2}
                                                    options={options2}
                                                />
                                            ) : (
                                                <Pie
                                                    style={{
                                                        marginTop: '1.5em',
                                                        marginLeft: '1.5em',
                                                        marginRight: '1.5em',
                                                        height: '90%'
                                                    }}
                                                    data={dat}
                                                    options={options3}
                                                />
                                            )}
                                        </div>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default Dashboard;
