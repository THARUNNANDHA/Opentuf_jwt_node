import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState();
    const [accesstoken, setaccesstoken] = useState(null);
    var accessToken_dup = null;

    const login = async (credentials) => {
        try {
            const response = await api.login(credentials);
            const { accessToken, refreshToken, user } = response.data;
            console.log(accessToken, user)
            // localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken ', refreshToken);
            setaccesstoken(accessToken);
            setuser(user);
            const result = true;
            return result;
        } catch (err) {
            console.error("error login", err);
        }
    }

    const logout = async () => {
        // localStorage.removeItem('accessToken');
        const respons = await api.logout();
        console.log(respons.data.success)
        localStorage.removeItem('refreshToken');
        setaccesstoken(null);
        setuser(null);
        return true;
    }

    const refreshAccessToken = async () => {
        try {
            // const refreshToken = localStorage.getItem('refreshToken');
            // if (!refreshToken) {
            //     logout();
            //     return;
            // }
            // const response = await api.refresh_token(refreshToken);
            // localStorage.setItem('accessToken', newAccessToken);
            const response = await api.refresh_token();
            const newAccessToken = response.data.accessToken;
            setaccesstoken(newAccessToken);
            accessToken_dup = newAccessToken;
            console.log(accesstoken);
            return true;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                if (err.response.data.fail) {
                    window.location.replace('/');
                }
            }
            else {
                console.log("there was an error")
            }
        }
    }
    const fetchdata = async (api_to_get, accesstoken) => {
        try {
            console.log(accesstoken)
            const response = await api.fetchdata(api_to_get, accesstoken);
            return response.data
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        const startrun = async () => {
            if (accesstoken == null) {
                await refreshAccessToken()
            }
        }
        startrun();
        // const accessToken = localStorage.getItem('accessToken')
        // const refreshToken = localStorage.getItem('refreshToken')

        // if (accessToken) {
        //     console.log('accessToken', accessToken)
        //     setaccesstoken(accessToken)
        // }
        // else

    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, accesstoken, user, refreshAccessToken, fetchdata }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
