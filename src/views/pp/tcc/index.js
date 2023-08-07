import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import { useEffect } from 'react';
import Header from 'layout/MainLayout/Header';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
});

function Index() {
    const [responsive, setResponsive] = useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = useState('200px');
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [partner, setPartner] = useState('');
    const [serviceSentIn, setserviceSentIn] = useState([]);
    const [serviceSentOut, setserviceSentOut] = useState([]);
    const [data, setData] = useState([]);
    const [dataInbound, setdataInbound] = useState([]);
    const [dataOutbound, setdataOutbound] = useState([]);
    const [service, setService] = useState('Inbound');
    const [alignment, setAlignment] = useState('Inbound');
    const [rp, setRp] = useState([]);
    const [Tcc, setTcc] = useState('');
    const [tapfile, setTapfileArray] = useState([]);
    const [partnerName, setPartnerName] = useState('');
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);
    const handleActive = () => {
        setActive1(!active1);
    };
    const handleActive1 = () => {
        setActive2(!active2);
    };
    const handleActive2 = () => {
        setActive3(!active3);
    };
    const handleActive3 = () => {
        setActive4(!active4);
    };
    useEffect(() => {
        const url = 'http://localhost:8080/testing/join1';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            let rpSet = new Set(response.data.map((item) => item.tadig));

            console.log('tadig', rpSet, response.data);
            const array = Array.from(rpSet);

            setRp(array);
            setData(response.data);
        });
        // const url1 = 'http://localhost:8080/testing';
        // axios.get(url1).then((response) => {
        //     console.log('Get req', response);
        //     // setData(response.data);
        // });
    }, []);

    function handleFile(event) {
        setTcc(event.target.files[0]);
    }

    const submitOutboundTcc = async (e) => {
        try {
            // console.log('inside submitOutboundTcc', partner, Tcc);
            const url = 'http://localhost:8080/ppini';
            const formdata = new FormData();
            formdata.append('pname', partnerName);
            formdata.append('tadig', partner);
            formdata.append('direction', 'Outbound');
            formdata.append('document', Tcc);
            formdata.append('services', serviceSentOut);
            formdata.append('name', `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`);
            await axios.patch(url, formdata).then((resp) => {
                // console.log('resp', resp.data.success);
                if (resp.data) {
                    window.location.href = '/pages/PatnerProvisioning/tcc';
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                alert(error.response.data.message);
            }
        }
    };
    const submitInboundTcc = async (e) => {
        e.preventDefault();
        try {
            console.log('pname', partnerName);
            const url = 'http://localhost:8080/ppini';
            const formdata = new FormData();
            formdata.append('pname', partnerName);
            formdata.append('tadig', partner);
            formdata.append('direction', 'Inbound');
            formdata.append('document', Tcc);
            formdata.append('services', serviceSentIn);
            formdata.append('name', `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`);
            await axios.patch(url, formdata).then((resp) => {
                console.log('resp', resp.data.success);
                if (resp.data) {
                    window.location.href = '/pages/PatnerProvisioning/tcc';
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                alert(error.response.data.message);
            }
        }
    };

    const handleChange = (event) => {
        // console.log('state of partner', event);
        setPartner(event.target.value);
        let partnerName = '';
        ``;
        data.map((item) => {
            if (item.tadig === event.target.value) {
                partnerName = item.pname;
            }
        });
        console.log('partner', partnerName);
        setPartnerName(partnerName);
        getFilteredData(event.target.value);
    };

    const columns = [
        { name: 'sno', label: 'S No.', options: { filterOptions: { fullWidth: true } } },
        {
            name: 'service',
            label: 'Service'
        },
        {
            name: 'document',
            label: 'Inbound Documents',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="text"
                                component="label"
                                style={{ fontSize: '0.9em' }}
                                onClick={() => {
                                    window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                                }}
                            >
                                View Docs
                            </Button>
                        </Stack>
                    );
                }
            }
        },
        {
            name: 'tapfile',
            label: 'Tap File',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    return <input type="text" name="tapfile" value={dataInbound[index].tapfile} />;
                }
            }
        },
        {
            name: 'date',
            label: 'Date',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    return <input type="date" value={dataInbound[index].date} />;
                }
            }
        }
    ];
    const columns1 = [
        { name: 'sno', label: 'S No.', options: { filterOptions: { fullWidth: true } } },
        {
            name: 'service',
            label: 'Service'
        },
        {
            name: 'document',
            label: 'Outbound Documents',
            options: {
                // filter: false,
                // sort: false,
                // display: false,
                // viewColumns: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                variant="text"
                                component="label"
                                style={{ fontSize: '0.9em' }}
                                onClick={() => {
                                    window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                                }}
                            >
                                View Docs
                            </Button>
                        </Stack>
                    );
                }
            }
        },
        {
            name: 'tapfile',
            label: 'Tap File',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    return <input type="text" name="tapfile" value={dataOutbound[index].tapfile} />;
                }
            }
        },
        {
            name: 'Date',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    let index = tableMeta['rowIndex'];
                    return <input type="date" value={dataOutbound[index].date} />;
                }
            }
        }
    ];
    const options = {
        search: true,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        // count: 3,
        textLabels: {
            body: {
                noMatch: 'Please Select the Roaming Partner'
            }
        },
        filter: filterBtn,
        filterType: 'dropdown',
        responsive,
        // rowsPerPage: 2,
        tableBodyHeight,
        // tableBodyHeight,
        // tableBodyMaxHeight,
        selectableRows: false,
        onTableChange: (action, state) => {
            //console.log(action);
            //console.dir(state);
        }
    };
    const handleAlign = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const sendReminder = async (e) => {
        e.preventDefault();
        try {
            // console.log('inside submitOutboundTcc', partner, Tcc);
            const url = 'http://localhost:8080/ppini/sendTccReminder';
            const obj = {};
            obj['pname'] = partnerName;
            obj['tadig'] = partner;
            obj['service'] = serviceSentIn;
            obj['name'] = `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`;
            console.log('data', obj);
            await axios.post(url, obj).then((resp) => {
                console.log('Email Sent', resp);
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                alert(error.response.data.message);
            }
        }
    };

    const requestTapFile = async (e) => {
        e.preventDefault();
        console.log('tapfile', tapfile);
        try {
            // console.log('inside submitOutboundTcc', partner, Tcc);
            const url = 'http://localhost:8080/ppini/tapfileArray';
            const obj = {};
            obj['pname'] = partnerName;
            obj['tadig'] = partner;
            obj['service'] = serviceSentOut;
            obj['tapfile'] = tapfile;
            obj['name'] = `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`;
            console.log('data', obj);
            await axios.post(url, obj).then((resp) => {
                console.log('Email Sent', resp);
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                alert(error.response.data.message);
            }
        }
    };

    const getFilteredData = (para) => {
        console.log('hi', para);
        let arrInbound = [];
        let arrOutbound = [];
        let servicesInbound = [];
        let servicesOutbound = [];
        let tapfileArray = [];
        let obj = {};
        data.map((item) => {
            if (item.tadig === para) {
                obj = item;
                console.log('item', item);
                // setService(item.direction);
                if (item.direction === 'Outbound') {
                    for (let i = 0; i < obj['service'].length; i++) {
                        let ob = {};
                        ob['sno'] = i + 1;
                        ob['service'] = obj['service'][i];
                        ob['document'] = obj['document'][i];
                        ob['tapfile'] = obj['tapout'][i];
                        ob['date'] = obj['date'][i];
                        arrOutbound.push(ob);
                        servicesOutbound.push(obj['service'][i]);
                        tapfileArray.push(obj['tapout'][i]);
                        // console.log('ob',ob)
                    }
                } else if (item.direction === 'Inbound') {
                    for (let i = 0; i < obj['service'].length; i++) {
                        let ob = {};
                        ob['sno'] = i + 1;
                        ob['service'] = obj['service'][i];
                        ob['document'] = obj['document'][i];
                        ob['tapfile'] = obj['tapin'][i];
                        ob['date'] = obj['date'][i];
                        arrInbound.push(ob);
                        servicesInbound.push(obj['service'][i]);
                        // tapfileArray.push(obj['tapout'][i]);
                        // console.log('ob',ob)
                    }
                    // arrInbound.push(item);
                    // services.push(item.service);
                }
                console.log('arr inbound', arrInbound);
                console.log('arr Outbound', arrOutbound);
                console.log('servicesInbound', servicesInbound);
                console.log('servicesOutbound', servicesOutbound);

                if (arrOutbound.length != 0 && arrInbound.length != 0) {
                    setService('Inbound & Outbound');
                } else if (arrOutbound.length != 0) {
                    setService('Outbound');
                } else if (arrInbound.length != 0) {
                    setService('Inbound');
                }
            }
        });
        setserviceSentIn(servicesInbound);
        setserviceSentOut(servicesOutbound);
        setdataInbound(arrInbound);
        setdataOutbound(arrOutbound);
        setTapfileArray(tapfileArray);
    };

    return (
        <>
            <div style={{ marginTop: '-90px' }}>
                <Header title={'Partner Provisioning'} subtitle={'TCC'} />
                <fieldset style={{ background: '#ffff', marginTop: '20px', marginBottom: '1rem', height: '7.5em' }}>
                    <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Roaming Partner</legend>
                    <Box style={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <InputLabel style={{ marginTop: '1rem', marginLeft: '1.5rem' }} id="demo-simple-select-label">
                                Partner
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={partner}
                                label="Partner"
                                onChange={handleChange}
                                style={{ width: '9rem', marginLeft: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem' }}
                            >
                                {rp.map((item, i) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </fieldset>
                {service === 'Inbound' ? (
                    <>
                        <CacheProvider style={{ marginTop: '.7rem' }} value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    id="button"
                                    style={{
                                        position: 'relative',
                                        left: 'calc(100% - 360px)',
                                        zIndex: '1',
                                        top: '7.3vh',
                                        background: 'rgba(103, 80, 164, 0.08)'
                                        // backgroundColor: active1 ? '#757ce8' : '#42a5f5'
                                    }}
                                    onChange={handleActive}
                                    disabled={partner == ''}
                                >
                                    <FileUploadOutlinedIcon /> Upload TCC
                                    <input hidden accept="application/" type="file" name="TCC" onChange={handleFile} />
                                </Button>
                                <MUIDataTable title={'Inbound Details'} data={dataInbound} columns={columns} options={options} />
                            </ThemeProvider>
                        </CacheProvider>
                        <Button
                            variant="contained"
                            component="label"
                            style={{
                                position: 'relative',
                                left: 'calc(100% - 280px)',
                                marginTop: '.5rem'
                                // background: '#5B86E5',
                                // color: 'white'
                            }}
                            onClick={sendReminder}
                            disabled={partner == ''}
                        >
                            Send Reminder
                        </Button>
                        <Button
                            variant="contained"
                            component="label"
                            style={{
                                position: 'relative',
                                left: 'calc(100% - 260px)',
                                marginTop: '.5rem'
                                // background: '#00338D',
                                // color: 'white'
                            }}
                            onClick={submitInboundTcc}
                            disabled={partner == ''}
                        >
                            Submit Inbound
                        </Button>
                    </>
                ) : service === 'Outbound' ? (
                    <>
                        <CacheProvider style={{ marginTop: '.7rem' }} value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    id="button"
                                    style={{
                                        position: 'relative',
                                        left: 'calc(100% - 367px)',
                                        zIndex: '1',
                                        top: '8vh',
                                        backgroundColor: active2 ? '#757ce8' : '#f8fafc',
                                        color: active2 ? 'white' : '#75808f'
                                    }}
                                    onChange={handleActive1}
                                >
                                    <FileUploadOutlinedIcon /> Upload TCC
                                    <input hidden accept="application/" type="file" name="TCC" onChange={handleFile} />
                                </Button>

                                <MUIDataTable title={'Outbound Details'} data={dataOutbound} columns={columns1} options={options} />
                            </ThemeProvider>
                        </CacheProvider>
                        <Button
                            variant="contained"
                            component="label"
                            style={{
                                position: 'relative',
                                left: 'calc(100% - 293px)',
                                top: ' calc(100% - 105px)',
                                marginTop: '.7rem'
                            }}
                            onClick={requestTapFile}
                        >
                            Request Tap File
                        </Button>
                        <Button
                            variant="contained"
                            component="label"
                            style={{
                                position: 'relative',
                                left: 'calc(100% - 275px)',
                                marginTop: '.7rem',
                                background: '#00338D',
                                color: 'white'
                            }}
                            onClick={submitOutboundTcc}
                        >
                            Submit Outbound
                        </Button>
                    </>
                ) : service === 'Inbound & Outbound' ? (
                    <>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            style={{ background: 'white', marginBottom: '.4rem', position: 'relative', left: 'calc(100% - 650px)' }}
                            onChange={handleAlign}
                            aria-label="Platform"
                        >
                            <ToggleButton value="Inbound">Inbound</ToggleButton>
                            <ToggleButton value="Outbound">Outbound</ToggleButton>
                        </ToggleButtonGroup>
                        {/* </Card> */}
                        {alignment === 'Inbound' ? (
                            <>
                                <CacheProvider style={{ marginTop: '.7rem' }} value={muiCache}>
                                    <ThemeProvider theme={createTheme()}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            id="button"
                                            style={{
                                                position: 'relative',
                                                left: 'calc(100% - 530px)',
                                                zIndex: '1',
                                                top: '8.8vh',
                                                backgroundColor: active3 ? '#757ce8' : '#f8fafc',
                                                color: active3 ? 'white' : '#75808f'
                                            }}
                                            disabled={partner == ''}
                                            onChange={handleActive2}
                                        >
                                            <FileUploadOutlinedIcon /> Upload TCC
                                            <input hidden accept="application/" type="file" name="TCC" onChange={handleFile} />
                                        </Button>
                                        <MUIDataTable title={'Inbound Details'} data={dataInbound} columns={columns} options={options} />
                                    </ThemeProvider>
                                </CacheProvider>
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{
                                        position: 'relative',
                                        left: 'calc(100% - 280px)',
                                        marginTop: '.5rem',
                                        background: '#5B86E5',
                                        color: 'white'
                                    }}
                                    onClick={sendReminder}
                                    disabled={partner == ''}
                                >
                                    Send Reminder
                                </Button>
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{
                                        position: 'relative',
                                        left: 'calc(100% - 260px)',
                                        marginTop: '.5rem',
                                        background: '#00338D',
                                        color: 'white'
                                    }}
                                    onClick={submitInboundTcc}
                                    disabled={partner == ''}
                                >
                                    Submit Inbound
                                </Button>
                            </>
                        ) : alignment === 'Outbound' ? (
                            <>
                                <CacheProvider style={{ marginTop: '.7rem' }} value={muiCache}>
                                    <ThemeProvider theme={createTheme()}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            id="button"
                                            style={{
                                                position: 'relative',
                                                left: 'calc(100% - 530px)',
                                                zIndex: '1',
                                                top: '8.8vh',
                                                backgroundColor: active4 ? '#757ce8' : '#f8fafc',
                                                color: active4 ? 'white' : '#75808f'
                                            }}
                                            onChange={handleActive3}
                                            disabled={partner == ''}
                                        >
                                            <FileUploadOutlinedIcon /> Upload TCC
                                            <input hidden accept="application/" type="file" name="TCC" onChange={handleFile} />
                                        </Button>
                                        <MUIDataTable title={'Outbound Details'} data={dataOutbound} columns={columns1} options={options} />
                                    </ThemeProvider>
                                </CacheProvider>
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{ position: 'relative', left: 'calc(100% - 300px)', marginTop: '.7rem' }}
                                    disabled={partner == ''}
                                    onClick={requestTapFile}
                                >
                                    Request Tap File
                                </Button>
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{
                                        position: 'relative',
                                        left: 'calc(100% - 280px)',
                                        marginTop: '.7rem',
                                        background: '#00338D',
                                        color: 'white'
                                    }}
                                    disabled={partner == ''}
                                    onClick={submitOutboundTcc}
                                >
                                    Submit Outbound
                                </Button>
                            </>
                        ) : (
                            ''
                        )}
                    </>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}

export default Index;
