import { Button } from '@material-ui/core';
import { GoogleLogin, GoogleLogout, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch'

const G_Login = () => {
    const [yourEmail, setYourEmail] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const checkLogin = async () => {
        const res = await fetch(`${process.env.SERVER_URL}/api/login/isLogin`, {
            method: 'GET',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
        });
        const data = await res.json();
        if(data.email) {
            setYourEmail(data.email);
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])

    const responseGoogle = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('googleId' in res) {
            const profile = await res.getBasicProfile();
            const email = profile.getEmail();
            setYourEmail(email);
            try {
                const res = await fetch(`${process.env.SERVER_URL}/api/login/login`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                })
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const logout = async () => {
        try {
            const res = await fetch(`${process.env.SERVER_URL}/api/login/logout`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ yourEmail })
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isLogin ? 
            <Button 
                onClick={logout}
                variant="outlined" 
                size='small'
            >
                로그아웃
            </Button> :
            <GoogleLogin
                clientId={`${process.env.GOOGLE_ID}`}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <div onClick={renderProps.onClick} style={{ cursor: 'pointer' }}>
                        <Button variant="outlined" 
                            size='small'
                        >
                            로그인
                        </Button>
                    </div>
                )}
            /> 
            }
        </>

    )
}

export default G_Login
