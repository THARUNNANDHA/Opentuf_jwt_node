import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "./CartProvider";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [cartItems, setCartItems] = useState(new Map());
    const [accesstoken, setaccesstoken] = useState(null);
    const [cartToggled, setCartToggled] = useState(false);
    const { cartItems, setCartItems } = useCart();

    const login = async (credentials) => {
        try {
            const response = await api.login(credentials);
            console.log(response.data);
            const { accessToken, refreshToken, user } = response.data;
            console.log(accessToken, user, refreshToken)
            // localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setaccesstoken(accessToken);
            localStorage.setItem('user', user);
            if (response.data.role) {
                if (response.data.role === 'admin') {
                    localStorage.setItem('admin', true)
                }
                localStorage.setItem('role', response.data.role)
                // console.log("admin", response.admin)
                return "/adminDashboard";
            }
            return "/home";
        } catch (err) {
            throw err;
        }
    }

    const logout = async () => {

        // localStorage.removeItem('accessToken');
        // const respons = await api.logout();
        // console.log(respons.data.success)
        const user = localStorage.getItem('user');
        console.log(cartItems)
        console.log(cartItems.size)
        try {
            if (cartItems.size === 0) {
                if (localStorage.getItem('cart')) {
                    const cart = localStorage.getItem('cart')
                    console.log(cart)
                    const response = await api.cart("/cart_update", { "user": user, "map": cart })
                }
            }
            else {
                const serializedCartItems = JSON.stringify(Array.from(cartItems.entries()));
                const response = await api.cart("/cart_update", { "user": user, "map": serializedCartItems })
            }
        }
        catch (e) {
            console.log(e)
        }

        localStorage.removeItem('cartCount');
        localStorage.removeItem('cart');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('user_image');
        localStorage.removeItem('admin');
        localStorage.removeItem('role');
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
            // console.log(accesstoken);
            return newAccessToken;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                if (err.response.data.error) {
                    await logout()
                    window.location.replace('/');
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
            if (access != null) {
                const response = await api.fetchdata(api_to_get, { "accesstoken": access });
                return response.data
            } else console.log("no accessToken")
        } catch (err) {
            console.error("error", err.response.data.error)
            if (err.response.data.error) {
                access = await refreshAccessToken()
                try {
                    if (access != null) {
                        const response = await api.fetchdata(api_to_get, { "accesstoken": access });
                        return response.data
                    } else console.log("no accessToken")
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
        <AuthContext.Provider value={{ cartToggled, setCartToggled, login, logout, accesstoken, refreshAccessToken, fetchdata, setaccesstoken, googlelogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
