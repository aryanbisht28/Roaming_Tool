import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function TopOperator({ data2, label2 }) {
    // console.log('data2', data2, label2);
    const [data1, setData] = useState(data2);
    const [label, setlabel] = useState(label2);

    useEffect(() => {
        const url = 'http://localhost:8080/ChargeableEventGeneration/topfivesmsmototalsdr';
        let data = [];
        let label = [];
        axios.get(url).then((response) => {
            response.data.map((val) => {
                console.log('val', val);
                data.push(val['maxGROSSSDR']);
                label.push(val['_id']);
            });
            setData(data);
            setlabel(label);
        });
    }, []);

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
        labels: label2.length != 0 ? label2 : label,
        datasets: [
            {
                fill: true,
                data: data2.length != 0 ? data2 : data1,
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
                <h3 style={{ margin: '0.2rem', display: 'flex', alignItems: 'center' }}>Top 5 Operators by Total SDR</h3>
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

export default TopOperator;
