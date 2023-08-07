import { useEffect, useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from '@mui/material';
import success from '../../assets/images/images/success.png';
import wrong from '../../assets/images/download.jpg';
import styles from './styles.module.css';

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <Fragment>
            {validUrl ? (
                <div className={styles.container}>
                    <Card
                        style={{
                            backgroundColor: '#fff',
                            width: '50%',
                            height: '75%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img src={success} alt="success_img" className={styles.success_img} />
                        <h1>Email verified successfully</h1>
                        <Link to="/">
                            <button className={styles.green_btn}>Login</button>
                        </Link>
                    </Card>
                </div>
            ) : (
                <div className={styles.container}>
                    <Card
                        style={{
                            backgroundColor: '#fff',
                            width: '50%',
                            height: '75%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img src={wrong} alt="wrong_img" className={styles.success_img} />
                        <h1>Error while Signing up</h1>
                        <Link to="/signup">
                            <button className={styles.green_btn}>Sign UP</button>
                        </Link>
                    </Card>
                </div>
            )}
        </Fragment>
    );
};

export default EmailVerify;
