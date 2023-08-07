import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function Subscriber() {
    const [lineChart, setlineChart] = React.useState('Data & Voice Rev. Date');

    const handlelineChart = (event) => {
        setlineChart(event.target.value);
    };

    const options = {
        responsive: true,
        pointStrokeColor: '#ffc8dd',
        pointColor: '#ffc8dd',
        strokeColor: '#ffc8dd',
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
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
                display: false,
                position: 'top',
                labels: {
                    color: '#000000',
                    font: {
                        size: 8
                    },
                    align: 'center',
                    padding: 5,
                    usePointStyle: true,
                    boxWidth: 6
                }
            }
        }
    };

    const data = {
        fill: true,
        labels: ['North', 'South', 'East', 'West'],
        datasets: [
            {
                data: [78, 84, 92, 96],
                borderColor: 'rgba(255, 159, 64, 0.2)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)'
            },
            {
                data: [78, 84, 92, 96],
                borderColor: 'rgba(75, 192, 192, 0.2)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }
        ]
    };
    const data1 = {
        labels: ['Jan', 'Feb', 'Mar', 'April'],
        datasets: [
            {
                label: 'Data Revenue_Date',
                fill: true,
                data: [78, 84, 92, 96],
                borderColor: 'rgba(255, 159, 64, 0.2)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)'
            },
            {
                label: 'Voice Revenue_Date',
                fill: true,
                data: [70, 64, 42, 76],
                borderColor: 'rgba(75, 192, 192, 0.2)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }
        ]
    };
    return (
        <Card
            style={{
                position: 'relative',
                marginBottom: '1%',
                padding: '1%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffff'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: '0.2rem', display: 'flex', alignItems: 'center' }}>{lineChart}</h3>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={lineChart}
                        onChange={handlelineChart}
                        label="Age"
                    >
                        <MenuItem value={'Data & Voice Rev. Date'}>Data & Voice Rev. Date</MenuItem>
                        <MenuItem value={'2G & 3G+4G Usage'}>2G & 3G+4G Usage</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div
                style={{
                    width: '95%',
                    height: '1.5px',
                    backgroundColor: '#6898ce',
                    marginTop: '6px',
                    marginBottom: '10px',
                    marginLeft: '0.5rem'
                }}
            />
            {lineChart === 'Data & Voice Rev. Date' ? (
                <Line height="99%" options={options} data={data1} />
            ) : (
                <Bar height="99%" options={options} data={data} />
            )}
        </Card>
    );
}

export default Subscriber;
