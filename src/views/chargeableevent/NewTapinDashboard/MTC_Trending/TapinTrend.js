import React, { Component } from 'react';
import Card from '@mui/material/Card';
import LineChart from 'echarts-for-react';
import axios from 'axios';

class TapinTrend extends Component {
    constructor(props) {
        super(props);
        this.state = { data1: [], data2: [], label: [] };
    }
    componentDidMount() {
        const url = 'http://localhost:8080/ChargeableEventGeneration/tapin/mtctrendanalysis';
        axios.get(url).then((response) => {
            console.log('Get req', response.data);
            let data1 = [];
            let data2 = [];
            let label = [];
            response.data.map((dat) => {
                data1.push(dat['maxMTCCOUNT']);
                data2.push(dat['maxMTCTOTALSDR']);
                label.push(dat['_id']);
            });
            this.setState({ data1: data1, data2: data2, label: label });
        });
    }
    render() {
        console.log('props', this.props);
        return (
            <Card
                style={{
                    // position: 'relative',
                    // marginTop: '100%',
                    // padding: '1%',
                    // display: 'flex',
                    // flexDirection: 'column',
                    backgroundColor: '#ffff',
                    height: '80%',
                    padding: 0,
                    margin: 0
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
                            data: ['Max MTC Count', 'Max MTC total SDR'],
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
                                name: 'Max MTC Count',
                                data: this.props.data1.length != 0 ? this.props.data1 : this.state.data1,
                                type: 'line',
                                stack: 'Total',
                                areaStyle: {},
                                emphasis: {
                                    focus: 'series'
                                }
                            },
                            {
                                name: 'Max MTC total SDR',
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
                    style={{ height: 260 }}
                />
            </Card>
        );
    }
}
export default TapinTrend;
