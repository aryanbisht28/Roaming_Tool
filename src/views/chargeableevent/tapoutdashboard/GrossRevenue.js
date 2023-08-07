import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function GrossRevenue() {
    const [lineChart, setlineChart] = React.useState('Gross Revenue(mm)');

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
        labels: ['Jan', 'Feb', 'Mar', 'April'],
        datasets: [
            {
                fill: true,
                data: [78, 84, 92, 45],
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
                        <MenuItem value={'Gross Revenue(mm)'}>Gross Revenue(mm)</MenuItem>
                        <MenuItem value={'Total Subscriber'}>Total Subscriber</MenuItem>
                        <MenuItem value={'Total MoU'}>Total MoU</MenuItem>
                        <MenuItem value={'Total Data Usage'}>Total Data Usage</MenuItem>
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
            <Line height="99%" options={options} data={data} />
        </Card>
    );
}

export default GrossRevenue;
