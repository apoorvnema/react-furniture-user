import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Link,
    Card,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import Loader from '../components/UI/Loader';
import CustomAlert from '../components/UI/Alert';
import ApiManager from '../services/ApiManager';
import { authAction } from '../store/auth';
import CustomEmailField from '../components/UI/Form/EmailField';
import CustomPasswordField from '../components/UI/Form/PasswordFIeld';
import HttpsIcon from '@mui/icons-material/Https';
import { Http } from '@mui/icons-material';
import CustomTextField from '../components/UI/Form/TextField';

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        message: 'Something went wrong!',
        type: 'error',
        visible: false
    });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({
                message: "Passwords do not match.",
                type: 'error',
                visible: true
            });
            return;
        }

        try {
            setLoading(true);
            const body = { name, email, password };
            const response = await ApiManager.signup(body);
            setAlert({
                message: "Signup Successful",
                type: 'success',
                visible: true
            });
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            setAlert({
                message: error.message || 'An error occurred during signup.',
                type: 'error',
                visible: true
            });
        } finally {
            setLoading(false);
            setTimeout(() => {
                setAlert({
                    message: 'Something went wrong!',
                    type: 'error',
                    visible: false
                });
            }, 3000);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', my: 10, p: 5, textAlign: 'center' }}>
            <Loader loading={loading} />
            <CustomAlert message={alert?.message} type={alert?.type} visible={alert?.visible} />
            <HttpsIcon sx={{ fontSize: 24, color:'white', backgroundColor: "#8D6E63", borderRadius: '50%', p: 1, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
                Sign Up
            </Typography>
            <Typography variant="body1" gutterBottom>
                Welcome to our website! Please sign up to continue.
            </Typography>
            <form onSubmit={handleSignup}>
                <CustomTextField
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />
                <CustomEmailField value={email} onChange={(e) => setEmail(e.target.value)} />
                <CustomPasswordField id={1} label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <CustomPasswordField id={2} label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button type="submit" variant="contained" fullWidth sx={{mb:2}}>
                    Sign Up
                </Button>
            </form>
            <Link style={{ cursor: 'pointer', marginTop: '1rem' }} onClick={() => navigate('/login')}>
                Already have an account? Log in
            </Link>
        </Card>
    );
}
