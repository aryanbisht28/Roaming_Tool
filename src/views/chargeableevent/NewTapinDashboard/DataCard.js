import { React, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
function DataCard() {
    const [details, setdetails] = useState({});

    useEffect(() => {
        const url = 'http://localhost:8080/ChargeableEventGeneration/tapin';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setdetails(response.data);
            console.log('details', details);
        });
    }, []);

    // console.log(details.ribbon);
    return (
        <Card style={{ backgroundColor: '#ffff' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '16.6%', margin: '0.5rem' }}>
                    <h3 style={{ margin: '0' }}>Roaming Partner</h3>
                    <div
                        style={{
                            width: '100%',
                            height: '1.5px',
                            backgroundColor: '#6898ce',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 6.49997H14L17.29 3.19997C17.383 3.10624 17.4936 3.03185 17.6154 2.98108C17.7373 2.93031 17.868 2.90417 18 2.90417C18.132 2.90417 18.2627 2.93031 18.3846 2.98108C18.5064 3.03185 18.617 3.10624 18.71 3.19997L21.29 5.78997C21.4762 5.97734 21.5808 6.23079 21.5808 6.49497C21.5808 6.75916 21.4762 7.01261 21.29 7.19997L19 9.49997H11V11.5C11 11.7652 10.8946 12.0195 10.7071 12.2071C10.5196 12.3946 10.2652 12.5 10 12.5C9.73478 12.5 9.48043 12.3946 9.29289 12.2071C9.10535 12.0195 9 11.7652 9 11.5V8.49997C9 7.96954 9.21071 7.46083 9.58578 7.08576C9.96086 6.71069 10.4696 6.49997 11 6.49997ZM5 11.5V15.5L2.71 17.79C2.52375 17.9773 2.4192 18.2308 2.4192 18.495C2.4192 18.7592 2.52375 19.0126 2.71 19.2L5.29 21.79C5.38296 21.8837 5.49356 21.9581 5.61542 22.0089C5.73728 22.0596 5.86799 22.0858 6 22.0858C6.13201 22.0858 6.26271 22.0596 6.38457 22.0089C6.50643 21.9581 6.61703 21.8837 6.71 21.79L11 17.5H15C15.2652 17.5 15.5196 17.3946 15.7071 17.2071C15.8946 17.0195 16 16.7652 16 16.5V15.5H17C17.2652 15.5 17.5196 15.3946 17.7071 15.2071C17.8946 15.0195 18 14.7652 18 14.5V13.5H19C19.2652 13.5 19.5196 13.3946 19.7071 13.2071C19.8946 13.0195 20 12.7652 20 12.5V11.5H13V12.5C13 13.0304 12.7893 13.5391 12.4142 13.9142C12.0391 14.2893 11.5304 14.5 11 14.5H9C8.46956 14.5 7.96086 14.2893 7.58578 13.9142C7.21071 13.5391 7 13.0304 7 12.5V9.49997L5 11.5Z"
                                fill="black"
                            />
                        </svg>
                        <h4>{Object.keys(details).length != 0 ? details['roamPart'] : '0'}</h4>
                    </div>
                </div>
                <div style={{ height: '16.6%', margin: '0.5rem' }}>
                    <h3 style={{ margin: '0' }}>Count of CDR</h3>
                    <div
                        style={{
                            width: '100%',
                            height: '1.5px',
                            backgroundColor: '#6898ce',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 3.5C16.42 3.5 20 5.29 20 7.5C20 9.71 16.42 11.5 12 11.5C7.58 11.5 4 9.71 4 7.5C4 5.29 7.58 3.5 12 3.5ZM4 9.5C4 11.71 7.58 13.5 12 13.5C16.42 13.5 20 11.71 20 9.5V12.58L19 12.5C16.41 12.5 14.2 14.14 13.36 16.44L12 16.5C7.58 16.5 4 14.71 4 12.5V9.5ZM4 14.5C4 16.71 7.58 18.5 12 18.5H13C13 19.55 13.27 20.54 13.75 21.4L12 21.5C7.58 21.5 4 19.71 4 17.5V14.5ZM18 21.58L15.25 18.58L16.41 17.42L18 19L21.59 15.42L22.75 16.83L18 21.58Z"
                                fill="black"
                            />
                        </svg>

                        <h4>{Object.keys(details).length != 0 ? details['countcdr'] : '0'}</h4>
                    </div>
                </div>
                <div style={{ height: '16.6%', margin: '0.5rem' }}>
                    <h3 style={{ margin: '0' }}>TAPIN File Count</h3>
                    <div
                        style={{
                            width: '100%',
                            height: '1.5px',
                            backgroundColor: '#6898ce',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13 9.5V4L18.5 9.5M6 2.5C4.89 2.5 4 3.39 4 4.5V20.5C4 21.0304 4.21071 21.5391 4.58579 21.9142C4.96086 22.2893 5.46957 22.5 6 22.5H18C18.5304 22.5 19.0391 22.2893 19.4142 21.9142C19.7893 21.5391 20 21.0304 20 20.5V8.5L14 2.5H6Z"
                                fill="black"
                            />
                        </svg>

                        <h4>{Object.keys(details).length != 0 ? details['tapfilecount'] : '0'}</h4>
                    </div>
                </div>
                <div style={{ height: '16.6%', margin: '0.5rem' }}>
                    <h3 style={{ margin: '0' }}>Gross SDR</h3>
                    <div
                        style={{
                            width: '100%',
                            height: '1.5px',
                            backgroundColor: '#6898ce',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.5 12C16.8283 12 17.1534 11.9353 17.4567 11.8097C17.76 11.6841 18.0356 11.4999 18.2678 11.2678C18.4999 11.0356 18.6841 10.76 18.8097 10.4567C18.9353 10.1534 19 9.8283 19 9.5C19 8.83696 18.7366 8.20107 18.2678 7.73223C17.7989 7.26339 17.163 7 16.5 7C15.837 7 15.2011 7.26339 14.7322 7.73223C14.2634 8.20107 14 8.83696 14 9.5C14 9.8283 14.0647 10.1534 14.1903 10.4567C14.3159 10.76 14.5001 11.0356 14.7322 11.2678C15.2011 11.7366 15.837 12 16.5 12ZM9 11C9.79565 11 10.5587 10.6839 11.1213 10.1213C11.6839 9.55871 12 8.79565 12 8C12 7.20435 11.6839 6.44129 11.1213 5.87868C10.5587 5.31607 9.79565 5 9 5C8.20435 5 7.44129 5.31607 6.87868 5.87868C6.31607 6.44129 6 7.20435 6 8C6 8.79565 6.31607 9.55871 6.87868 10.1213C7.44129 10.6839 8.20435 11 9 11ZM16.5 14C14.67 14 11 14.92 11 16.75V19H22V16.75C22 14.92 18.33 14 16.5 14ZM9 13C6.67 13 2 14.17 2 16.5V19H9V16.75C9 15.9 9.33 14.41 11.37 13.28C10.5 13.1 9.66 13 9 13Z"
                                fill="black"
                            />
                        </svg>
                        <h4>{Object.keys(details).length != 0 ? details['totalgross'] : '0'}</h4>
                    </div>
                </div>
                <div style={{ height: '16.6%', margin: '0.5rem' }}>
                    <h3 style={{ margin: '0' }}>Country Count</h3>
                    <div
                        style={{
                            width: '100%',
                            height: '1.5px',
                            backgroundColor: '#6898ce',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.9 17.89C17.64 17.09 16.89 16.5 16 16.5H15V13.5C15 13.2348 14.8946 12.9804 14.7071 12.7929C14.5196 12.6054 14.2652 12.5 14 12.5H8V10.5H10C10.2652 10.5 10.5196 10.3946 10.7071 10.2071C10.8946 10.0196 11 9.76522 11 9.5V7.5H13C13.5304 7.5 14.0391 7.28929 14.4142 6.91421C14.7893 6.53914 15 6.03043 15 5.5V5.09C17.93 6.27 20 9.14 20 12.5C20 14.58 19.2 16.47 17.9 17.89ZM11 20.43C7.05 19.94 4 16.58 4 12.5C4 11.88 4.08 11.28 4.21 10.71L9 15.5V16.5C9 17.0304 9.21071 17.5391 9.58579 17.9142C9.96086 18.2893 10.4696 18.5 11 18.5M12 2.5C10.6868 2.5 9.38642 2.75866 8.17317 3.2612C6.95991 3.76375 5.85752 4.50035 4.92893 5.42893C3.05357 7.3043 2 9.84784 2 12.5C2 15.1522 3.05357 17.6957 4.92893 19.5711C5.85752 20.4997 6.95991 21.2362 8.17317 21.7388C9.38642 22.2413 10.6868 22.5 12 22.5C14.6522 22.5 17.1957 21.4464 19.0711 19.5711C20.9464 17.6957 22 15.1522 22 12.5C22 11.1868 21.7413 9.88642 21.2388 8.67317C20.7362 7.45991 19.9997 6.35752 19.0711 5.42893C18.1425 4.50035 17.0401 3.76375 15.8268 3.2612C14.6136 2.75866 13.3132 2.5 12 2.5Z"
                                fill="black"
                            />
                        </svg>
                        <h4>{Object.keys(details).length != 0 ? details['countryCount'] : '0'}</h4>
                    </div>
                </div>
                <div style={{ height: '16.6%', margin: '0.5rem' }}>
                    <h3 style={{ margin: '0' }}>Total Tax</h3>
                    <div
                        style={{
                            width: '100%',
                            height: '1.5px',
                            backgroundColor: '#6898ce',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '3vh' }}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 15.5H9C9 16.58 10.37 17.5 12 17.5C13.63 17.5 15 16.58 15 15.5C15 14.4 13.96 14 11.76 13.47C9.64 12.94 7 12.28 7 9.5C7 7.71 8.47 6.19 10.5 5.68V3.5H13.5V5.68C15.53 6.19 17 7.71 17 9.5H15C15 8.42 13.63 7.5 12 7.5C10.37 7.5 9 8.42 9 9.5C9 10.6 10.04 11 12.24 11.53C14.36 12.06 17 12.72 17 15.5C17 17.29 15.53 18.81 13.5 19.32V21.5H10.5V19.32C8.47 18.81 7 17.29 7 15.5Z"
                                fill="black"
                            />
                        </svg>
                        <h4>{Object.keys(details).length != 0 ? details['TOTAL_TAX'] : '0'}</h4>
                    </div>
                </div>
                <div style={{ height: '16.6%', margin: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Marquee>
                        {details &&
                            details.ribbon &&
                            details.ribbon.map((data) => (
                                <h4 style={{ marginRight: '0.5rem' }}>
                                    {data.Country}
                                    <span style={{ marginLeft: '0.5rem' }}>{data.total}</span>
                                </h4>
                            ))}
                    </Marquee>
                </div>
            </div>
        </Card>
    );
}

export default DataCard;
