import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

function StackedChart() {
    const [date, setDate] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/addCr';
        axios.get(url).then((response) => {
            // console.log('Get req', response.data);
            setDate(response.data);
        });
    }, []);
    const month = [];
    let jan = 0;
    let dec = 0;
    let feb = 0;
    let apr = 0;
    let may = 0;
    let jun = 0;
    let jly = 0;
    let aug = 0;
    let sept = 0;
    let oct = 0;
    let nov = 0;
    let mar = 0;
    for (let i = 0; i < date.length; i++) {
        month[i] = new Date(date[i].createdAt).getMonth();
        if (month[i] === 0) {
            jan = jan + 1;
        } else if (month[i] === 1) {
            feb = feb + 1;
        } else if (month[i] === 2) {
            mar = mar + 1;
        } else if (month[i] === 3) {
            apr = apr + 1;
        } else if (month[i] === 4) {
            may = may + 1;
        } else if (month[i] === 5) {
            jun = jun + 1;
        } else if (month[i] === 6) {
            jly = jly + 1;
        } else if (month[i] === 7) {
            aug = aug + 1;
        } else if (month[i] === 8) {
            sept = sept + 1;
        } else if (month[i] === 9) {
            oct = oct + 1;
        } else if (month[i] === 10) {
            nov = nov + 1;
        } else if (month[i] === 11) {
            dec = dec + 1;
        }
    }

    const [date1, setDate1] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/ppini/ttdate';
        axios.get(url).then((response) => {
            console.log('Get req ttd', response.data[0]._id);
            setDate1(response.data);
        });
    }, []);
    const month1 = [];
    let jan1 = 0;
    let dec1 = 0;
    let feb1 = 0;
    let apr1 = 0;
    let may1 = 0;
    let jun1 = 0;
    let jly1 = 0;
    let aug1 = 0;
    let sept1 = 0;
    let oct1 = 0;
    let nov1 = 0;
    let mar1 = 0;
    for (let i = 0; i < date1.length; i++) {
        month1[i] = new Date(date1[i]._id).getMonth();
        if (month1[i] === 0) {
            jan1 = jan1 + 1;
        } else if (month1[i] === 1) {
            feb1 = feb1 + 1;
        } else if (month1[i] === 2) {
            mar1 = mar1 + 1;
        } else if (month1[i] === 3) {
            apr1 = apr1 + 1;
        } else if (month1[i] === 4) {
            may1 = may1 + 1;
        } else if (month1[i] === 5) {
            jun1 = jun1 + 1;
        } else if (month1[i] === 6) {
            jly1 = jly1 + 1;
        } else if (month1[i] === 7) {
            aug1 = aug1 + 1;
        } else if (month1[i] === 8) {
            sept1 = sept1 + 1;
        } else if (month1[i] === 9) {
            oct1 = oct1 + 1;
        } else if (month1[i] === 10) {
            nov1 = nov1 + 1;
        } else if (month1[i] === 11) {
            dec1 = dec1 + 1;
        }
    }

    const [date2, setDate2] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/subs';
        axios.get(url).then((response) => {
            // console.log('Get req', response.data);
            setDate2(response.data);
        });
    }, []);
    const month2 = [];
    let jan2 = 0;
    let dec2 = 0;
    let feb2 = 0;
    let apr2 = 0;
    let may2 = 0;
    let jun2 = 0;
    let jly2 = 0;
    let aug2 = 0;
    let sept2 = 0;
    let oct2 = 0;
    let nov2 = 0;
    let mar2 = 0;
    for (let i = 0; i < date2.length; i++) {
        month2[i] = new Date(date2[i].createdAt).getMonth();
        if (month2[i] === 0) {
            jan2 = jan2 + 1;
        } else if (month2[i] === 1) {
            feb2 = feb2 + 1;
        } else if (month2[i] === 2) {
            mar2 = mar2 + 1;
        } else if (month2[i] === 3) {
            apr2 = apr2 + 1;
        } else if (month2[i] === 4) {
            may2 = may2 + 1;
        } else if (month2[i] === 5) {
            jun2 = jun2 + 1;
        } else if (month2[i] === 6) {
            jly2 = jly2 + 1;
        } else if (month2[i] === 7) {
            aug2 = aug2 + 1;
        } else if (month2[i] === 8) {
            sept2 = sept2 + 1;
        } else if (month2[i] === 9) {
            oct2 = oct2 + 1;
        } else if (month2[i] === 10) {
            nov2 = nov2 + 1;
        } else if (month2[i] === 11) {
            dec2 = dec2 + 1;
        }
    }

    const [date3, setDate3] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:8080/ppini';
        axios.get(url).then((response) => {
            // console.log('Get req', response.data);
            setDate3(response.data);
        });
    }, []);
    const month3 = [];
    let jan3 = 0;
    let dec3 = 0;
    let feb3 = 0;
    let apr3 = 0;
    let may3 = 0;
    let jun3 = 0;
    let jly3 = 0;
    let aug3 = 0;
    let sept3 = 0;
    let oct3 = 0;
    let nov3 = 0;
    let mar3 = 0;
    for (let i = 0; i < date3.length; i++) {
        month3[i] = new Date(date3[i].createdAt).getMonth();
        if (month3[i] === 0) {
            jan3 = jan3 + 1;
        } else if (month3[i] === 1) {
            feb3 = feb3 + 1;
        } else if (month3[i] === 2) {
            mar3 = mar3 + 1;
        } else if (month3[i] === 3) {
            apr3 = apr3 + 1;
        } else if (month3[i] === 4) {
            may3 = may3 + 1;
        } else if (month3[i] === 5) {
            jun3 = jun3 + 1;
        } else if (month3[i] === 6) {
            jly3 = jly3 + 1;
        } else if (month3[i] === 7) {
            aug3 = aug3 + 1;
        } else if (month3[i] === 8) {
            sept3 = sept3 + 1;
        } else if (month3[i] === 9) {
            oct3 = oct3 + 1;
        } else if (month3[i] === 10) {
            nov3 = nov3 + 1;
        } else if (month3[i] === 11) {
            dec3 = dec3 + 1;
        }
    }

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
        // Name of the variables on x-axies for each bar
        labels,
        datasets: [
            {
                label: 'Commercial Review',
                data: [jan, feb, mar, apr, may, jun, jly, aug, sept, oct, nov, dec],
                backgroundColor: ['#AB0D82']
            },
            {
                label: 'Under Testing',
                data: [jan3, feb3, mar3, apr3, may3, jun3, jly3, aug3, sept3, oct3, nov3, dec3],
                backgroundColor: ['#76D2FF']
            },
            {
                label: 'Completed',
                data: [jan1, feb1, mar1, apr1, may1, jun1, jly1, aug1, sept1, oct1, nov1, dec1],
                backgroundColor: ['#00338D']
            },
            {
                label: 'Launched',
                data: [jan2, feb2, mar2, apr2, may2, jun2, jly2, aug2, sept2, oct2, nov2, dec2],
                backgroundColor: [' #FFA3DA']
            }
        ]
    };

    const options = {
        responsive: true,
        // maintainAspectRatio: false,
        barThickness: 18, // Set the width of each bar in pixels
        maxBarThickness: 40, // Set the maximum width of each bar in pixels
        borderWidth: 1,
        borderRadius: 20, // This will round the corners
        // borderSkipped: false,

        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                stacked: true,
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            datalabels: {
                display: false
            },
            legend: {
                labels: {
                    color: '#000000',
                    font: {
                        size: 10
                    },
                    align: 'center',
                    padding: 5,
                    usePointStyle: true,
                    boxWidth: 6
                }
            }
        }
    };
    return (
        <>
            <Bar height="80%" options={options} data={data} />
        </>
    );
}

export default StackedChart;
