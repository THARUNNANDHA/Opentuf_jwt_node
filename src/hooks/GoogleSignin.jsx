import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import api from "../services/api";
import { useAuth } from "../context/authContext"

export default function GoogleSignin() {
    const { setaccesstoken } = useAuth()
    const handleSuccess = async (response) => {
        try {
            console.log(response)
            const result = await api.googlelogin(response.credential);
            console.log(result.data)
            setaccesstoken(result.data.accessToken);
            localStorage.setItem('refreshToken', result.data.refreshToken);
            localStorage.setItem('user', result.data.name);
            localStorage.setItem('user_image', result.data.picture);
            window.location.replace('/dashboard');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log('failed to login');
                }}
            />
        </div>
    )
}