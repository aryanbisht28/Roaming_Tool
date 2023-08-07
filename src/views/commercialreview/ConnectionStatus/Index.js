import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Details from './iniDetails';
import Card from '@mui/material/Card';
import { gridSpacing } from 'store/constant';
import { Grid, InputBase } from '@mui/material';
import TextField from '@mui/material/TextField';
// import OwnDetails from './OwnDetails';
// import RoamDetails from './RoamDetails';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Header from 'layout/MainLayout/Header';

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

function Index() {
    const [responsive, setResponsive] = useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = useState('380px');
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [modify, setModify] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [dataa, setDataa] = useState([]);
    const [rowData, setRowData] = useState('');
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleModify = () => setModify(true);
    const handleModifyClose = () => setModify(false);
    const [data, setData] = React.useState([]);
    const [simID, setID] = React.useState([]);
    const [email, setEmail] = React.useState(false);
    const handleEmail = () => setEmail(true);
    const handleEmailClose = () => setEmail(false);
    const [details, setDetails] = useState({ to: '', cc: '' });
    const [partner, setPartner] = useState('');

    React.useEffect(() => {
        const url = 'http://localhost:8080/ppini/connect';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setData(response.data);
        });
    }, []);

    const handleDetails = ({ currentTarget: input }) => {
        setDetails({ ...details, [input.name]: input.value });
    };

    const handleChange = (e) => {
        console.log('partner', e.target.value);
        // setDetails({ ...details, ['partner']: e.target.value });
        setPartner(e.target.value);
    };

    const sendDetailedMail = async (e) => {
        e.preventDefault();
        try {
            const emailArray = details.to.split(',');
            const ccEmail = details.cc.split(',');
            console.log('hi', emailArray, ccEmail);
            const url = 'http://localhost:8080/ppini/sendConnectionInfoMAil';
            let sendData = '';
            data.map((item) => {
                // console.log('inside data');
                if (item['Tadig'] === partner) {
                    // console.log('cond match');
                    // console.log('item', item);
                    sendData = item;
                }
            });
            console.log('outside loop');
            sendData['to'] = emailArray;
            sendData['cc'] = ccEmail;
            console.log('sendData', sendData);
            console.log('data', sendData);
            sendData['name'] = `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`;
            await axios.post(url, sendData).then((resp) => {
                if (resp.data === 'posted') {
                    window.location.href = '/pages/CommercialReview/ConnectionStatus';
                }
            });
            console.log(formdata);
            // window.location.href = '/pages/CommercialReview/Dashboard';
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
        // setEmail(false);
    };

    const columns = [
        { label: 'Tadig', name: 'Tadig', options: { filterOptions: { fullWidth: true } } },
        {
            name: 'Inboundservice',
            label: 'Inbound service',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    // console.log(value['3G']);
                    return Object.keys(value).map((v) => (
                        <>
                            <Chip
                                style={{
                                    fontSize: '.8em',
                                    width: 'auto',
                                    fontWeight: 800,
                                    height: '4vh',
                                    marginTop: '1em',
                                    background: value[`${v}`] == 'Terminated' ? 'red' : value[`${v}`] == 'Live' ? 'green' : 'white',
                                    border: '2px solid black',
                                    borderRadius: '10%',
                                    color: 'black'
                                }}
                                color="primary"
                                key={v}
                                label={v}
                            />
                            <span> </span>
                        </>
                    ));
                }
            }
        },
        {
            name: 'Outboundservice',
            label: 'Outbound service',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return Object.keys(value).map((v) => (
                        <>
                            <Chip
                                style={{
                                    fontSize: '.8em',
                                    width: 'auto',
                                    fontWeight: 800,
                                    height: '4vh',
                                    marginTop: '1em',
                                    background: value[`${v}`] == 'Terminated' ? 'red' : value[`${v}`] == 'Live' ? 'green' : 'white',
                                    border: '2px solid black',
                                    borderRadius: '10%',
                                    color: 'black'
                                }}
                                color="primary"
                                key={v}
                                label={v}
                            />
                            <span> </span>
                        </>
                    ));
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
            // console.log(action);
            // console.dir(state);
        },
        customToolbar: () => {
            return (
                <Button
                    variant="contained"
                    component="label"
                    id="button"
                    style={{
                        background: 'rgba(0, 94, 184, 0.22)',
                        color: 'black'
                    }}
                    onClick={() => {
                        handleEmail();
                    }}
                >
                    <EmailOutlinedIcon /> Send Mail
                </Button>
            );
        }
    };
    return (
        <>
            <div style={{ marginTop: '-90px' }}>
                <Header title={'Commercial Review'} subtitle={'Connection Status'} />
                <div style={{ marginTop: '20px' }}></div>
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable data={data} columns={columns} options={options} />
                    </ThemeProvider>
                </CacheProvider>

                <Modal
                    open={email}
                    onClose={handleEmailClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '50%',
                            bgcolor: 'white',
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
                            <div
                                style={{
                                    margin: '1em',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#FFFFF'
                                }}
                            >
                                <span style={{ marginRight: '0.5em', fontSize: '1em' }}>To: </span>
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
                                <span style={{ marginRight: '0.5em', fontSize: '1em', color: '#00338D' }}>
                                    Select the Roaming Partner:{' '}
                                </span>
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
                                            <MenuItem key={item.Tadig} value={item.Tadig}>
                                                {item.Tadig}
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

                {/* <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <CloseIcon style={{ position: 'relative', left: '64vw', top: '-2.5vh', cursor: 'pointer' }} onClick={handleClose} />
                        <OwnDetails row={rowData} />
                    </Box>
                </Modal>

                <Modal open={open1} onClose={handleClose1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <CloseIcon
                            style={{ position: 'relative', left: '64vw', top: '-2.5vh', cursor: 'pointer' }}
                            onClick={handleClose1}
                        />
                        <RoamDetails row={rowData} />
                    </Box>
                </Modal>

                <Modal
                    open={modify}
                    onClose={handleModifyClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <CloseIcon
                            style={{ position: 'relative', left: '64vw', top: '-2.5vh', cursor: 'pointer' }}
                            onClick={handleModifyClose}
                        />
                        <Details row={rowData} simID={simID} />
                    </Box>
                </Modal> */}
            </div>
        </>
    );
}

export default Index;
