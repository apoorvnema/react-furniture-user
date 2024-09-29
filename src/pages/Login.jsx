import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Link,
    Card,
} from '@mui/material';
import { SignInPage } from '@toolpad/core';
import CustomEmailField from '../components/UI/Form/EmailField';
import CustomPasswordField from '../components/UI/Form/PasswordFIeld';
import CustomButton from '../components/UI/Form/Button';
import { useState } from 'react';
import Loader from '../components/UI/Loader';
import CustomAlert from '../components/UI/Alert';
import ApiManager from '../services/ApiManager';
import { authAction } from '../store/auth';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        message: 'Something went wrong!',
        type: 'error',
        visible: false
    });
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const providers = [{ id: 'credentials', name: 'Email and Password' }];

    function SignUpLink() {
        return (
            <Link style={{ cursor: 'pointer' }} onClick={() => navigation("/signup")} variant="body2">
                Sign up
            </Link>
        );
    }

    function ForgotPasswordLink() {
        return (
            <Link style={{ cursor: 'pointer' }} onClick={() => { 
                setAlert({
                    message: "Ask administrator to recover your account",
                    type: 'warning',
                    visible: true
                })
                setTimeout(() => {
                    setAlert({
                        message: 'Something went wrong!',
                        type: 'error',
                        visible: false
                    })
                }, 3000);
             }} variant="body2">
                Forgot password?
            </Link>
        );
    }

    async function login(email, password) {
        try {
            setLoading(true)
            const body = { email: email, password: password, returnSecureToken: true };
            const response = await ApiManager.login(body);
            setAlert({
                message: "Login Successful",
                type: 'success',
                visible: true
            })
            localStorage.setItem('token', response.idToken);
            localStorage.setItem('name', response.displayName);
            localStorage.setItem('email', response.email);
            dispatch(authAction.login({
                name: response.displayName,
                token: response.idToken,
                email: response.email
            }));
            setTimeout(() => {
                navigation('/');
            }, 1000);
        }
        catch (error) {
            setAlert({
                message: error,
                type: 'error',
                visible: true
            })
        }
        finally {
            setLoading(false)
            setTimeout(() => {
                setAlert({
                    message: 'Something went wrong!',
                    type: 'error',
                    visible: false
                })
            }, 3000);
        }
    }

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', my: 10, p: 5 }}>
            <Loader loading={loading} />
            <CustomAlert message={alert?.message} type={alert?.type} visible={alert?.visible} />
            <SignInPage
                signIn={(provider, formData) => {
                    login(formData.get('email'), formData.get('Password'))
                }
                }
                slots={{
                    emailField: CustomEmailField,
                    passwordField: CustomPasswordField,
                    submitButton: CustomButton,
                    signUpLink: SignUpLink,
                    forgotPasswordLink: ForgotPasswordLink,
                }}
                providers={providers}
            />
        </Card>
    );
}
