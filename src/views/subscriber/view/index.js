import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { InputBase } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Header from 'layout/MainLayout/Header';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

function Index() {
    const [responsive, setResponsive] = useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = useState('450px');
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [data, setData] = useState([]);
    const [email, setEmail] = React.useState(false);
    const handleEmail = () => setEmail(true);
    const handleEmailClose = () => setEmail(false);
    const [details, setDetails] = useState({ to: '', cc: '' });
    const [partner, setPartner] = useState('');

    const handleDetails = ({ currentTarget: input }) => {
        setDetails({ ...details, [input.name]: input.value });
    };

    const handleChange = (e) => {
        setPartner(e.target.value);
    };

    const sendDetailedMail = async () => {
        // e.preventDefault();
        try {
            const emailArray = details.to.split(',');
            const ccEmail = details.cc.split(',');
            const url = 'http://localhost:8080/subs/sendInfoMAil';
            let sendData = {};
            console.log('part', partner);
            data.map((item) => {
                if (`${item.pname}(${item.direction} ${item.unilateral})` === partner) {
                    sendData = item;
                    console.log('hi');
                }
            });
            console.log('sendData', sendData);
            sendData['to'] = emailArray;
            sendData['cc'] = ccEmail;
            sendData['name'] = `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`;
            console.log('sendData', sendData);
            console.log('data', sendData);
            await axios.post(url, sendData).then((resp) => {
                if (resp.data === 'posted') {
                    window.location.href = '/pages/SubscriberProvisioning/view';
                    // setEmail(false);
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    React.useEffect(() => {
        const url = 'http://localhost:8080/subs';
        axios.get(url).then((response) => {
            console.log('Get req', response);
            setData(response.data);
        });
    }, []);

    const columns = [
        { label: 'Roaming Partner', name: 'pname', options: { filterOptions: { fullWidth: true } } },
        {
            label: 'Service',
            name: 'service',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value.map((v) => (
                        <>
                            <Chip
                                style={{
                                    fontSize: '.8em',
                                    width: 'auto',
                                    fontWeight: 800,
                                    height: '4vh',
                                    marginTop: '1em',
                                    background: 'white',
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
            name: 'direction',
            label: 'Direction'
        },
        {
            name: 'unilateral',
            label: 'Unilateral',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value === '' ? 'N/A' : value;
                }
            }
        },
        {
            name: 'date',
            label: 'Date'
        },
        {
            name: 'IR21',
            label: 'IR21',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '1em', color: '#087F23' }}
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
            name: 'CLL',
            label: 'CLL',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="text"
                            component="label"
                            style={{ fontSize: '1em', color: '#087F23' }}
                            onClick={() => {
                                window.open('http://localhost:8080/uploads/docs/' + value, '_blank');
                            }}
                        >
                            View
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
            console.log(action);
            console.dir(state);
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
                <Header title={'Subscriber Provisioning'} subtitle={'View Launch'} />
                <div style={{ marginTop: '20px' }}></div>
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
                                            <MenuItem
                                                key={`${item.pname}(${item.direction} ${item.unilateral})`}
                                                value={`${item.pname}(${item.direction} ${item.unilateral})`}
                                            >
                                                {`${item.pname}(${item.direction} ${item.unilateral})`}
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
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable title={'View'} data={data} columns={columns} options={options} />
                    </ThemeProvider>
                </CacheProvider>
            </div>
        </>
    );
}

export default Index;
