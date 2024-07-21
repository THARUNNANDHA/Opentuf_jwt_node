import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [GoogleUserdata, setGoogleUserdata] = useState();
    const [accesstoken, setaccesstoken] = useState(null);
    var accessToken_dup;
    const [cartToggled, setCartToggled] = useState(false);
    const login = async (credentials) => {
        try {
            const response = await api.login(credentials);
            const { accessToken, refreshToken, user } = response.data;
            console.log(accessToken, user, refreshToken)
            // localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setaccesstoken(accessToken);
            localStorage.setItem('user', user);
            const result = true;
            return result;
        } catch (err) {
            console.error("error login", err);
        }
    }

    const logout = async () => {
        // localStorage.removeItem('accessToken');
        // const respons = await api.logout();
        // console.log(respons.data.success)
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('user_image');

        setaccesstoken(null);
        return true;
    }

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            // if (!refreshToken) {
            //     logout();
            //     return;
            // }
            // const response = await api.refresh_token(refreshToken);
            // localStorage.setItem('accessToken', newAccessToken);
            console.log("refresh", refreshToken)
            const response = await api.refresh_token({ "refreshToken": refreshToken });
            const newAccessToken = response.data.accessToken;
            setaccesstoken(newAccessToken);
            accessToken_dup = newAccessToken;
            // console.log(accesstoken);
            return newAccessToken;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                if (err.response.data.fail) {
                    window.location.replace('/');
                    logout()
                    console.log("hear")
                }
            }
            else {
                console.log("there was an error")
            }
        }
    }

    // const fetchdata = async (api_to_get) => {
    //     try {
    //         var access = accesstoken;
    //         if (access == null) {
    //             access = await refreshAccessToken()
    //         }
    //         const response = await api.fetchdata(api_to_get, { "accesstoken": access });
    //         return response.data
    //     } catch (err) {
    //         console.error("error", err.response.data.fail)
    //         if (err.response.data.fail) {
    //             access = await refreshAccessToken()
    //             try {
    //                 const response = await api.fetchdata(api_to_get, { "accesstoken": access });
    //                 return response.data
    //             } catch (err) {
    //                 console.error(err)
    //             }
    //         }
    //     }
    // }

    const fetchdata = async (api_to_get) => {
        try {
            var access = accesstoken;
            if (access == null) {
                access = await refreshAccessToken()
            }
            const response = await api.fetchdata(api_to_get, { headers: { 'Authorization': `Bearer ${access}` } });
            return response.data
        } catch (err) {
            console.error("error", err.response.data.fail)
            if (err.response.data.fail) {
                access = await refreshAccessToken()
                try {
                    const response = await api.fetchdata(api_to_get, { headers: { 'Authorization': `Bearer ${access}` } });
                    return response.data
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
            const startrun = async () => {
                if (accesstoken == null) {
                    const access = await refreshAccessToken({ 'refreshToken': refreshToken })
                    setaccesstoken(access)
                    console.log("access token", access)
                }
            }
            startrun();
        }
        else {
            console.log("no refresh token found")
        }
        // const accessToken = localStorage.getItem('accessToken')

        // if (accessToken) {
        //     console.log('accessToken', accessToken)
        //     setaccesstoken(accessToken)
        // }
        // else

    }, [])

    const googlelogin = async (google_res) => {
        console.log(google_res);
        // response = await api.googlelogin(google_res)
    }
    return (
        <AuthContext.Provider value={{ cartToggled, setCartToggled, login, logout, accesstoken, refreshAccessToken, fetchdata, accesstoken, setaccesstoken, googlelogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
