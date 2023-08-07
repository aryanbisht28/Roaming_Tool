import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '@mui/material/Card';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function TotalDuration() {
    const [data1, setData] = useState([]);
    const [label, setlabel] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/ChargeableEventGeneration/topfivegprscount';
        let data = [];
        let label = [];
        axios.get(url).then((response) => {
            response.data.map((val) => {
                console.log('val', val);
                data.push(val['maxGPRSCOUNT']);
                label.push(val['_id']);
            });
            setData(data);
            setlabel(label);
        });
    }, []);
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
        labels: label,
        datasets: [
            {
                data: data1,
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
            <div style={{ display: 'flex' }}>
                <h3 style={{ margin: '0.2rem', display: 'flex', alignItems: 'center' }}>Total Duration - Country Wise</h3>
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

export default TotalDuration;
