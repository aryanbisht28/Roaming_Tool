import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import '../simRepo/index.css';
import Header from 'layout/MainLayout/Header';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 440px)',
    // height: 'calc(100% - 130px)',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

function Index() {
    const [data, setData] = useState([]);
    const [responsive, setResponsive] = useState('vertical');
    const [tableBodyHeight, setTableBodyHeight] = useState('380px');
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [editRow, setEditingRow] = useState('');
    const [deleteRow, setDeleteRow] = useState('');
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [date, setDate] = useState();
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [active1, setActive1] = useState(false);
    const [file, setFile] = useState();
    const fileReader = new FileReader();
    const [details, setDetails] = useState('');
    const [form, setForm] = useState({
        TADIG: '',
        MCC: '',
        IMSI: '',
        ICCID: '',
        ValidUntil: '',
        Status: ''
    });

    React.useEffect(() => {
        const url = 'http://localhost:8080/simRepo';
        axios.get(url).then((response) => {
            console.log('Get req excel', response.data);
            setData(response.data);
            // setOpen(false);
        });
    }, []);

    const onClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('hi');
            onClose();
            const url = 'http://localhost:8080/simRepo/update';
            console.log('values', editRow);
            axios.post(url, editRow).then((resp) => {
                if (resp.data === 'updated') {
                    console.log(resp.data);
                    console.log('successful');
                    window.location.href = '/pages/PatnerProvisioning/simRepo';
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            console.log('heeeelllooo', details);
            const url = 'http://localhost:8080/simRepo/addNew';
            axios.post(url, details).then((resp) => {
                if (resp.data === 'new row added') {
                    console.log(resp.data);
                    console.log('successful');
                    window.location.href = '/pages/PatnerProvisioning/simRepo';
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
        setActive1(!active1);
    };

    const csvFileToArray = async (string) => {
        const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
        const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

        const array = csvRows.map((i) => {
            const values = i.split(',');
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        console.log('arrat', array);
        try {
            const url = 'http://localhost:8080/simRepo';
            setOpen(true);
            await axios.post(url, array).then((resp) => {
                if (resp.data === 'posted') {
                    console.log(resp.data);
                    console.log('successful');
                    setOpen(false);
                    window.location.href = '/pages/PatnerProvisioning/simRepo';
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        }
        setOpen2(false);
    };

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    // const handleAddSubmit = () => {};
    const columns = [
        {
            name: 'TADIG',
            label: 'TADIG',
            options: { filterOptions: { fullWidth: true } }
        },
        { label: 'MCC/MNC', name: 'MCC' },
        {
            label: 'IMSI',
            name: 'IMSI'
        },
        {
            label: 'ICCID',
            name: 'ICCID'
        },
        {
            name: 'ValidUntil',
            label: 'Valid Until'
        },
        {
            name: 'Status',
            label: 'Status'
        },
        {
            name: 'Delete',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    // console.log('val', value, 'tableMeta', tableMeta);
                    const url = 'http://localhost:8080/simRepo/delete';
                    return (
                        <IconButton
                            color="error"
                            onClick={() => {
                                console.log('hi', value, tableMeta);
                                setDeleteRow(data[tableMeta['rowIndex']]);
                                axios.post(url, data[tableMeta['rowIndex']]).then((resp) => {
                                    if (resp.data === 'deleted') {
                                        console.log(resp.data);
                                        console.log('successful');
                                        // setOpen(false);
                                        window.location.href = '/pages/PatnerProvisioning/simRepo';
                                    }
                                });
                            }}
                        >
                            <DeleteOutlinedIcon style={{ color: 'black' }} />
                        </IconButton>
                    );
                }
            }
        },
        {
            name: 'Edit',
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    // console.log('val',tableMeta['rowIndex'])
                    return (
                        <IconButton
                            onClick={() => {
                                setEditingRow(data[tableMeta['rowIndex']]);
                                setOpen(true);
                            }}
                        >
                            <BorderColorOutlinedIcon style={{ color: 'black' }} />
                        </IconButton>
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
            // console.log('details', details, 'partner', partner);
            // console.log(action);
            // console.dir(state);
        },
        customToolbar: () => {
            return (
                <>
                    <IconButton onClick={handleOpen1}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={handleOpen2}>
                        <PublishIcon />
                    </IconButton>
                </>
            );
        }
    };

    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 926px)',
        // height: 'calc(100% - 130px)',
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };

    const handleDetails = ({ currentTarget: input }) => {
        setDetails({ ...details, [input.name]: input.value });
    };
    return (
        <>
            <div style={{ marginTop: '-90px' }}>
                <Header title={'Patner Provisioning'} subtitle={'Sim Repository'} />
                <div style={{ marginTop: '20px' }}></div>
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable data={data} columns={columns} options={options} />
                    </ThemeProvider>
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style1}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                                <CloseIcon onClick={handleClose2} />
                            </div>
                            <fieldset style={{ background: '#ffff' }}>
                                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Import CSV</legend>
                                <form style={{ display: 'flex', marginTop: '0.7em', justifyContent: 'center', alignItems: 'center' }}>
                                    <p style={{ fontSize: '1em', fontWeight: '500', marginRight: '1em' }}>Choose file to import</p>
                                    <div
                                        className="file"
                                        style={{ backgroundColor: active1 ? '#757ce8' : 'rgba(0, 94, 184, 0.22)', color: 'black' }}
                                    >
                                        Choose File
                                        <input
                                            type={'file'}
                                            id={'csvFileInput'}
                                            accept={'.csv'}
                                            onChange={handleOnChange}
                                            className="hide_file"
                                        />
                                    </div>
                                </form>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                                    <Button
                                        variant="contained"
                                        onClick={(e) => {
                                            handleOnSubmit(e);
                                        }}
                                        style={{
                                            fontSize: '0.7em',

                                            marginTop: '0.5em',
                                            background: '#00338D',
                                            color: 'white'
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </fieldset>
                        </Box>
                    </Modal>
                    <Modal
                        open={open1}
                        onClose={handleClose1}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                                <CloseIcon onClick={handleClose1} />
                            </div>
                            <fieldset
                                style={{
                                    background: '#ffff',

                                    marginTop: '1em',
                                    height: 'calc(100% - 60px)'
                                }}
                            >
                                <legend style={{ fontSize: '1.3rem', fontWeight: '500' }}>Add New Data</legend>
                                <Grid item xs={12} md={8} style={{ marginTop: '2vh' }}>
                                    <form>
                                        <Grid container spacing={gridSpacing} style={{ marginTop: '2em' }}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    required
                                                    name="TADIG"
                                                    label="TADIG"
                                                    fullWidth
                                                    onChange={handleDetails}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    required
                                                    name="MCC"
                                                    label="MCC/MNC"
                                                    type="number"
                                                    pattern="[0-9]*"
                                                    inputmode="numeric"
                                                    fullWidth
                                                    onChange={handleDetails}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={gridSpacing} style={{ marginTop: '2em' }}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    required
                                                    name="IMSI"
                                                    label="IMSI"
                                                    type="number"
                                                    pattern="[0-9]*"
                                                    inputmode="numeric"
                                                    fullWidth
                                                    onChange={handleDetails}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    required
                                                    name="ICCID"
                                                    label="ICCID"
                                                    type="number"
                                                    pattern="[0-9]*"
                                                    inputmode="numeric"
                                                    fullWidth
                                                    onChange={handleDetails}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={gridSpacing} style={{ marginTop: '2em' }}>
                                            <Grid item xs={6}>
                                                <input
                                                    type="text"
                                                    name="ValidUntil"
                                                    onFocus={(e) => (e.target.type = 'date')}
                                                    onBlur={(e) => (e.target.type = 'text')}
                                                    placeholder="Valid until"
                                                    fullWidth
                                                    value={date}
                                                    style={{
                                                        width: '25.7em',
                                                        height: '3.65em',
                                                        borderRadius: '13px',
                                                        fontSize: '1em',
                                                        textAlign: 'left',
                                                        borderStyle: 'solid',
                                                        borderColor: '#00338D',
                                                        borderWidth: '2.5px',
                                                        backgroundColor: '#f8fafc',
                                                        color: '#9da3a9'
                                                    }}
                                                    onChange={(event) => {
                                                        console.log(event.target.value);
                                                        setDate(event.target.value);
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <TextField
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    required
                                                    name="Status"
                                                    label="Status"
                                                    fullWidth
                                                    onChange={handleDetails}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* <AddIcon /> */}
                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={{
                                                    marginTop: '2em',
                                                    background: '#00338D',
                                                    color: 'white'
                                                }}
                                                onClick={handleSubmit1}
                                                // onClick={handleOnDelte}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                        {/* </Card> */}
                                    </form>
                                </Grid>
                            </fieldset>
                        </Box>
                    </Modal>
                </CacheProvider>
            </div>
            <Dialog open={open} scroll={scroll}>
                <DialogTitle textAlign="center" style={{ background: 'white' }}>
                    Edit Details
                </DialogTitle>
                <DialogContent style={{ background: 'white' }}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Stack
                            sx={{
                                width: '100%',
                                minWidth: { xs: '300px', sm: '360px', md: '400px' }
                                // gap: '.1rem'
                            }}
                        >
                            {columns.map((column) =>
                                column.name === 'Delete' || column.name == 'Edit' ? (
                                    ''
                                ) : (
                                    <>
                                        <br></br>
                                        <TextField
                                            key={column.name}
                                            label={column.label}
                                            name={column.name}
                                            defaultValue={editRow[`${column.name}`]}
                                            onChange={(e) => setEditingRow({ ...editRow, [e.target.name]: e.target.value })}
                                        />
                                    </>
                                )
                            )}
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions sx={{ p: '1.25rem' }} style={{ background: 'white' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button color="secondary" onClick={handleSubmit} variant="contained" style={{ background: '#00338D' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Index;
