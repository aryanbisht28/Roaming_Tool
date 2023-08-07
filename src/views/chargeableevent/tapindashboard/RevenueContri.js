import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function RevenueContri() {
    const [lineChart, setlineChart] = React.useState('% Revenue Contri by Zone');

    const handlelineChart = (event) => {
        setlineChart(event.target.value);
    };

    const options = {
        responsive: true,
        tension: 0.5,
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
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
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
                        <MenuItem value={'% Revenue Contri by Zone'}>% Rev Contri by Zone</MenuItem>
                        <MenuItem value={'%Subs Contri by Zone'}>%Subs Contri by Zone</MenuItem>
                        <MenuItem value={'% MoU Contri by Zone'}>% MoU Contri by Zone</MenuItem>
                        <MenuItem value={'% Data Contri by Zone'}>% Data Contri by Zone</MenuItem>
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
            <Bar height="99%" options={options} data={data} />
        </Card>
    );
}

export default RevenueContri;
