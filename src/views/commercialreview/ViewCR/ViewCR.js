import MUIDataTable from 'mui-datatables';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import ViewSPOC from './ViewSPOC';
import Index from './ModifyCR';
import axios from 'axios';
import Header from 'layout/MainLayout/Header';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InputBase from '@mui/material/InputBase';
import './Modal.css';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    // height:'80%',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

function ViewCR() {
    const [responsive, setResponsive] = useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = useState('380px');
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [modify, setModify] = React.useState(false);
    const [email, setEmail] = React.useState(false);
    const handleEmail = () => setEmail(true);
    const handleEmailClose = () => setEmail(false);
    const handleModify = () => setModify(true);
    const handleModifyClose = () => setModify(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [partner, setPartner] = useState('');
    const [details, setDetails] = useState({ to: '', cc: '' });

    React.useEffect(() => {
        const url = 'http://localhost:8080/addCr';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setData(response.data);
        });
    }, []);

    // useEffect(() => {
    //     try {
    //         const url = 'http://localhost:8080/addCr';
    //         // details['spocDetail'] = data;
    //         const { data: res } = axios.get(url);
    //         console.log(res.data);
    //         //     // localStorage.setItem('token', res.data);
    //         //     // window.location = '/pages/dashboard/default';
    //     } catch (error) {
    //         if (error.response && error.response.status >= 400 && error.response.status <= 500) {
    //             setError(error.response.data.message);
    //         }
    //     }
    //     //   let mounted = true;
    //     //   getList()
    //     // .then(items => {
    //     //   if(mounted) {
    //     //     setList(items)
    //     //   }
    //     // })
    //     //   return () => mounted = false;
    // }, []);
    function handleSpoc(value) {
        // e.preventDefault();
        console.log('Handle Spoc', value);
    }

    const handleDetails = ({ currentTarget: input }) => {
        setDetails({ ...details, [input.name]: input.value });
    };

    const handleChange = (e) => {
        // console.log('partner', e.target.value);
        // setDetails({ ...details, ['partner']: e.target.value });
        setPartner(e.target.value);
    };

    const sendDetailedMail = async (e) => {
        e.preventDefault();
        try {
            const emailArray = details.to.split(',');
            const ccEmail = details.cc.split(',');
            const url = 'http://localhost:8080/addCr/sendInfoMAil';
            let sendData = '';
            data.map((item) => {
                if (item.tadig === partner) {
                    sendData = item;
                }
            });
            sendData['to'] = emailArray;
            sendData['cc'] = ccEmail;
            sendData['name'] = `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`;
            console.log('sendData', sendData);
            console.log('data', sendData);

            await axios.post(url, sendData).then((resp) => {
                if (resp.data === 'posted') {
                    window.location.href = '/pages/CommercialReview/ViewReview';
                }
            });
            console.log(formdata);
            // window.location.href = '/pages/CommercialReview/Dashboard';
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
        setEmail(false);
    };

    const columns = [
        { name: 'pname', label: 'Partner Name', options: { filterOptions: { fullWidth: true } } },
        {
            name: 'tadig',
            label: 'TADIG ID'
        },
        {
            name: 'MCC',
            label: 'MCC/MNC'
        },
        { name: 'country', label: 'Country', options: { filter: false, sort: false, display: false, viewColumns: true } },
        {
            name: 'AA12',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '0.65em', color: '#087F23' }}
                            onClick={() => {
                                window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                            }}
                        >
                            View
                        </Button>
                    );
                }
            }
        },
        {
            name: 'AA13',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '0.65em', color: '#087F23' }}
                            onClick={() => {
                                window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                            }}
                        >
                            View
                        </Button>
                    );
                }
            }
        },
        {
            name: 'AA14',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '0.65em', color: '#087F23' }}
                            onClick={() => {
                                window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                            }}
                        >
                            View
                        </Button>
                    );
                }
            }
        },
        {
            name: 'IR21',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '0.65em', color: '#087F23' }}
                            onClick={() => {
                                window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                            }}
                        >
                            View
                        </Button>
                    );
                }
            }
        },
        {
            name: 'SPOC',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            onClick={() => {
                                handleOpen();
                                let row = tableMeta['rowIndex'];
                                console.log('spoc', tableMeta['rowIndex']);
                                console.log('spoc details', data[row]);
                                setRowData(data[row]);
                            }}
                            style={{ fontSize: '0.65em', color: '#087F23' }}
                        >
                            Details
                        </Button>
                    );
                }
            }
        },
        {
            name: 'Action',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="contained"
                            component="label"
                            onClick={() => {
                                handleModify();
                                let row = tableMeta['rowIndex'];
                                console.log('spoc', tableMeta['rowIndex']);
                                console.log('spoc details', data[row]);
                                setRowData(data[row]);
                            }}
                            style={{ fontSize: '0.65em', background: '#00338D', color: '#ffffff' }}
                        >
                            Modify
                        </Button>
                    );
                }
            }
        }
    ];

    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        selectableRows: false,
        textLabels: {
            body: {
                noMatch: 'Fetching Details...'
            }
        },
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: 'dropdown',
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onTableChange: (action, state) => {
            console.log('details', details, 'partner', partner);
            console.log(action);
            console.dir(state);
        },
        customToolbar: () => {
            return (
                <Button
                    variant="contained"
                    component="label"
                    style={{
                        background: 'rgba(0, 94, 184, 0.22)',
                        color: 'black'
                    }}
                    onClick={() => {
                        handleEmail();
                    }}
                >
                    <EmailOutlinedIcon /> <span style={{ marginLeft: '5px' }}>Send Mail</span>
                </Button>
            );
        }
    };
    // const [email1, setEmail1] = useState('');
    // const [emailValid, setEmailValid] = useState(false);
    // useEffect(() => {
    //     const isValid = validateEmail(email1);
    //     setEmailValid(isValid);
    // }, [email]);

    // function validateEmail(email1) {
    //     // A simple email validation function, you can replace it with your own validation logic
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email1);
    // }

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                        <CloseIcon onClick={handleClose} />
                    </div>

                    <ViewSPOC spoc={rowData} />
                </Box>
            </Modal>
            <Modal open={modify} onClose={handleModifyClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style1}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                        <CloseIcon onClick={handleModifyClose} />
                    </div>
                    <Index row={rowData} />
                </Box>
            </Modal>

            <Modal open={email} onClose={handleEmailClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        bgcolor: '#ffff',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                        <CloseIcon onClick={handleEmailClose} />
                    </div>
                    <fieldset>
                        <legend style={{ fontSize: '1.5em', fontWeight: '500' }}>Send Email</legend>
                        <div style={{ margin: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ marginRight: '0.5em', fontSize: '1em', color: '#00338D' }}>To: </span>
                            <InputBase
                                onChange={handleDetails}
                                value={details.to}
                                required
                                id="outlined-basic"
                                name="to"
                                placeholder="enter the email"
                                variant="outlined"
                                fullWidth
                                sx={{ border: '2px solid #00338D', borderRadius: 1, padding: '10px', height: '7vh' }}
                                // style={{ border: 'solid', borderColor: '#00338D' }}
                            />
                            <br></br>
                        </div>
                        <div style={{ margin: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ marginRight: '0.5em', fontSize: '1em', color: '#00338D' }}>cc: </span>
                            <InputBase
                                onChange={handleDetails}
                                value={details.cc}
                                name="cc"
                                id="outlined-basic"
                                placeholder="enter the email"
                                variant="outlined"
                                fullWidth
                                sx={{ border: '2px solid #00338D', borderRadius: 1, padding: '10px', height: '7vh' }}
                            />
                        </div>
                        <div
                            style={{
                                margin: '1em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <span style={{ marginRight: '0.5em', fontSize: '1em', color: '#00338D' }}>Select the Roaming Partner: </span>
                            <FormControl fullWidth>
                                <InputLabel style={{ marginTop: '1rem', marginLeft: '1.6rem' }} id="demo-simple-select-label">
                                    Partner
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={partner}
                                    label="Partner"
                                    name="partner"
                                    onChange={handleChange}
                                    style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', marginTop: '1rem' }}
                                >
                                    {data.map((item) => (
                                        <MenuItem key={item.tadig} value={item.tadig}>
                                            {item.tadig}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Button
                            variant="contained"
                            component="label"
                            style={{
                                position: 'relative',
                                left: 'calc(100% - 137px)',
                                top: 'calc(100% - 503px)',
                                zIndex: '1',
                                background: 'rgba(0, 94, 184, 0.22)',
                                color: 'black'
                            }}
                            onClick={sendDetailedMail}
                        >
                            <EmailOutlinedIcon /> <span style={{ marginLeft: '5px' }}>Send Mail</span>
                        </Button>
                    </fieldset>
                </Box>
            </Modal>
            <div style={{ marginTop: '-90px' }}>
                <Header title={'Commercial Review'} subtitle={'View'} />
                <div style={{ marginTop: '20px' }}></div>
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable data={data} columns={columns} options={options} />
                    </ThemeProvider>
                </CacheProvider>
                {/* <Button
                    variant="contained"
                    style={{
                        background: 'rgba(0, 94, 184, 0.22)',
                        color: 'black',
                        position: 'absolute',
                        left: '73.5vw',
                        bottom: '81vh'
                    }}
                    onClick={() => {
                        handleEmail();
                    }}
                >
                    <EmailOutlinedIcon /> Send Mail
                </Button> */}
            </div>
        </>
    );
}

export default ViewCR;
