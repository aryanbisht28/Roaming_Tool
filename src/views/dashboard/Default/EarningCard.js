import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: 'rgba(172, 234, 255, 0.5)',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: 'rgba(172, 234, 255, 0.5)'
    }
}));
// }

const EarningCard = ({ isLoading, name, value, img }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 1 }}>
                        <Grid container>
                            <div
                                style={{
                                    width: '80%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                    // justifyContent: 'center',
                                    // alignItems: 'center'
                                }}
                            >
                                <Grid
                                    item
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        margin: '5px'
                                    }}
                                >
                                    {img}
                                    {/* <svg width="44" height="32" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M21.7284 6.90356C24.3097 5.4369 28.0482 4.90356 31.5196 4.90356C34.1009 4.90356 36.8425 5.1969 39.1212 5.9569C40.4207 6.3969 41.293 7.34356 41.293 8.42356V23.4636C41.293 25.2102 39.1212 26.4902 36.8781 26.0502C35.1335 25.7169 33.282 25.5702 31.5018 25.5702C28.7247 25.5702 25.7695 25.9036 23.384 26.7969C22.3337 27.1969 21.1231 27.1969 20.055 26.7969C17.6695 25.9169 14.7143 25.5702 11.9372 25.5702C10.157 25.5702 8.30556 25.7169 6.56094 26.0502C4.31786 26.4769 2.146 25.1969 2.146 23.4636V8.42356C2.146 7.34356 3.0183 6.3969 4.31786 5.9569C6.61435 5.1969 9.35589 4.90356 11.9372 4.90356C15.4086 4.90356 19.1471 5.4369 21.7284 6.90356ZM11.9283 7.33325C14.3138 7.33325 17.5004 7.87992 19.9393 8.65325V23.9866C17.5004 23.2133 14.3138 22.6666 11.9283 22.6666C9.79204 22.6666 7.65578 22.8666 5.69754 23.3333V7.99992C7.65578 7.53325 9.79204 7.33325 11.9283 7.33325ZM37.7415 23.3333C35.7833 22.8666 33.647 22.6666 31.5107 22.6666C29.1252 22.6666 25.9386 23.2133 23.4997 23.9866V8.65325C25.9386 7.86658 29.1252 7.33325 31.5107 7.33325C33.647 7.33325 35.7833 7.53325 37.7415 7.99992V23.3333Z"
                                            fill="#0C233C"
                                        />
                                        <path
                                            d="M31.5107 12.6666C33.0773 12.6666 34.5905 12.7866 35.9613 13.0133V10.9866C34.5549 10.7866 33.0417 10.6666 31.5107 10.6666C29.232 10.6666 27.1314 10.8799 25.28 11.2933V13.3866C27.0424 12.9199 29.1608 12.6666 31.5107 12.6666Z"
                                            fill="#0C233C"
                                        />
                                        <path
                                            d="M31.5107 16.2135C33.0773 16.2135 34.5905 16.3335 35.9613 16.5601V14.5335C34.5549 14.3335 33.0417 14.2135 31.5107 14.2135C29.232 14.2135 27.1314 14.4268 25.28 14.8401V16.9335C27.0424 16.4801 29.1608 16.2135 31.5107 16.2135Z"
                                            fill="#0C233C"
                                        />
                                        <path
                                            d="M31.5107 19.7734C33.0773 19.7734 34.5905 19.8934 35.9613 20.12V18.0934C34.5549 17.8934 33.0417 17.7734 31.5107 17.7734C29.232 17.7734 27.1314 17.9867 25.28 18.4V20.4934C27.0424 20.0267 29.1608 19.7734 31.5107 19.7734Z"
                                            fill="#0C233C"
                                        />
                                    </svg> */}
                                </Grid>
                                <Grid
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        marginLeft: '5px',
                                        width: '100%'
                                    }}
                                >
                                    <Typography
                                        style={{
                                            color: '#0C233C',
                                            fontWeight: '300',
                                            textAlign: 'center',
                                            fontSize: '1em'
                                        }}
                                    >
                                        {name}
                                    </Typography>
                                </Grid>
                            </div>

                            <Grid style={{ width: '20%' }}>
                                <Typography
                                    color="#0C233C"
                                    variant="h2"
                                    style={{ fontWeight: '500', textAlign: 'center', fontSize: '2em', margin: '0.2em' }}
                                >
                                    {value}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
