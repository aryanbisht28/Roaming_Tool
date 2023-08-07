import React from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Churn() {
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
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
            {
                data: [78, 84, 92],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 0.2)'
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
            <h3 style={{ margin: '0.2rem' }}>Subscriber Churn by Month</h3>
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
            <Line options={options} data={data} />
        </Card>
    );
}

export default Churn;
