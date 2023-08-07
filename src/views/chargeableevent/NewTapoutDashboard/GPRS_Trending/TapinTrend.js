// import React from 'react';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import { Line } from 'react-chartjs-2';
// import Card from '@mui/material/Card';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

// function TapinTrend() {
//     const [lineChart, setlineChart] = React.useState('Data & Voice Rev. Date');

//     const handlelineChart = (event) => {
//         setlineChart(event.target.value);
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         height: 100,
//         width: 650,
//         pointStrokeColor: '#ffc8dd',
//         pointColor: '#ffc8dd',
//         strokeColor: '#ffc8dd'
//         // scales: {
//         //     x: {
//         //         grid: {
//         //             display: false
//         //         }
//         //     },
//         //     y: {
//         //         grid: {
//         //             display: false
//         //         }
//         //     }
//         // },
//         // plugins: {
//         //     datalabels: {
//         //         display: false
//         //     },
//         //     legend: {
//         //         display: false,
//         //         position: 'top',
//         //         labels: {
//         //             color: '#000000',
//         //             font: {
//         //                 size: 8
//         //             },
//         //             align: 'center',
//         //             // padding: 5,
//         //             usePointStyle: true
//         //             // boxWidth: 6
//         //         }
//         //     }
//         // }
//     };

//     const data = {
//         fill: true,
//         labels: ['North', 'South', 'East', 'West'],
//         datasets: [
//             {
//                 data: [78, 84, 92, 96],
//                 borderColor: 'rgba(255, 159, 64, 0.2)',
//                 backgroundColor: 'rgba(255, 159, 64, 0.2)'
//             },
//             {
//                 data: [78, 84, 92, 96],
//                 borderColor: 'rgba(75, 192, 192, 0.2)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)'
//             }
//         ]
//     };
//     const data1 = {
//         labels: ['Jan', 'Feb', 'Mar', 'April'],
//         datasets: [
//             {
//                 label: 'Data Revenue_Date',
//                 fill: true,
//                 data: [78, 84, 92, 96],
//                 borderColor: 'rgba(255, 159, 64, 0.2)',
//                 backgroundColor: 'rgba(255, 159, 64, 0.2)'
//             },
//             {
//                 label: 'Voice Revenue_Date',
//                 fill: true,
//                 data: [70, 64, 42, 76],
//                 borderColor: 'rgba(75, 192, 192, 0.2)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)'
//             }
//         ]
//     };
//     return (
//         <Card
//             style={{
//                 position: 'relative',
//                 marginBottom: '1%',
//                 padding: '1%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 backgroundColor: '#ffff',
//                 height: '87.5%'
//             }}
//         >
//             <div style={{ display: 'flex' }}>
//                 <h3 style={{ margin: '0.2rem', display: 'flex', alignItems: 'center' }}>TAPIN - Trend Analysis of Count & Amount</h3>
//             </div>

//             {/* <div
//                 style={{
//                     width: '95%',
//                     height: '1.5px',
//                     backgroundColor: '#6898ce',
//                     marginTop: '4px',
//                     marginBottom: '4px',
//                     marginLeft: '0.5rem'
//                 }}
//             /> */}
//             <Line options={options} data={data1} />
//         </Card>
//     );
// }

// export default TapinTrend;

import React, { Component } from 'react';
import Card from '@mui/material/Card';
import LineChart from 'echarts-for-react';
import axios from 'axios';

class TapinTrend extends Component {
    constructor() {
        super();
        this.state = { data1: [], data2: [], label: [] };
    }
    componentDidMount() {
        const url = 'http://localhost:8080/ChargeableEventGeneration/gprstrendanalysis';
        axios.get(url).then((response) => {
            console.log('Get req', response.data);
            let data1 = [];
            let data2 = [];
            let label = [];
            response.data.map((dat) => {
                data1.push(dat['GPRSCOUNT']);
                data2.push(dat['maxGPRSTOTALSDR']);
                label.push(dat['_id']);
            });
            this.setState({ data1: data1, data2: data2, label: label });
        });
    }
    render() {
        return (
            <Card
                style={{
                    // position: 'relative',
                    // marginBottom: '1%',
                    // padding: '1%',
                    // display: 'flex',
                    // flexDirection: 'column',
                    backgroundColor: '#ffff',
                    height: '85%'
                }}
            >
                {/* <div style={{ display: 'flex' }}>
                    <h3 style={{ margin: '0.2rem', display: 'flex', alignItems: 'center' }}>TAPIN - Trend Analysis of Count & Amount</h3>
                </div>

                 <div
                    style={{
                        width: '95%',
                        height: '1.5px',
                        backgroundColor: '#6898ce',
                        marginTop: '4px',
                        // marginBottom: '4px',
                        marginLeft: '0.5rem'
                    }}
                />  */}
                <LineChart
                    option={{
                        title: {
                            text: 'TAPIN - Trend Analysis of Count & Amount',
                            textStyle: {
                                fontSize: '1.17em',
                                fontWeight: 'bold'
                            }
                        },
                        graphic: [
                            {
                                type: 'line',
                                left: 'left',
                                top: '5%',
                                shape: {
                                    x1: -650,
                                    y1: 6,
                                    x2: 120,
                                    y2: -4
                                },
                                style: {
                                    stroke: '#6898ce',
                                    lineWidth: 1.5
                                }
                            }
                        ],

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        // toolbox: {
                        //     feature: {
                        //       saveAsImage: {}
                        //     }
                        //   },
                        legend: {
                            data: ['Max GPRS Count', 'Max GPRS Total SDR'],
                            orient: 'vertical',
                            top: 18,
                            right: 10
                        },
                        xAxis: {
                            type: 'category',
                            // boundaryGap: false,
                            data: this.props.label2.length != 0 ? this.props.label2 : this.state.label
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: 'Max GPRS Count',
                                data: this.props.data1.length != 0 ? this.props.data1 : this.state.data1,
                                type: 'line',
                                stack: 'Total',
                                areaStyle: {},
                                emphasis: {
                                    focus: 'series'
                                }
                            },
                            {
                                name: 'Max GPRS Total SDR',
                                data: this.props.data2.length != 0 ? this.props.data2 : this.state.data2,
                                type: 'line',
                                stack: 'Total',
                                areaStyle: {},
                                emphasis: {
                                    focus: 'series'
                                }
                            }
                        ]
                    }}
                    style={{ height: 250 }}
                />
            </Card>
        );
    }
}
export default TapinTrend;
