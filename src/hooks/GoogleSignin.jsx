import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import api from "../services/api";
import { useAuth } from "../context/authContext"
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";

export default function GoogleSignin() {
    const { setaccesstoken } = useAuth()
    const { setCartItems, cartCount, setcartCount } = useCart();
    const navigate = useNavigate()
    const handleSuccess = async (response) => {
        try {
            console.log(response)
            const result = await api.googlelogin(response.credential);
            console.log(result.data)
            setaccesstoken(result.data.accessToken);
            localStorage.setItem('refreshToken', result.data.refreshToken);
            localStorage.setItem('user', result.data.name);
            localStorage.setItem('role', result.data.role);
            localStorage.setItem('user_image', result.data.picture);
            const cart_resp = await api.cart("/getCart", { "uesr": result.data.name })
            if (cart_resp.data) {
                const parsedMap = new Map(JSON.parse(cart_resp.data.map.map));
                await setCartItems(parsedMap)
                localStorage.setItem('cart', cart_resp.data.map.map);
                var count_of_items = 0;
                for (const [key, value] of parsedMap.entries()) {
                    count_of_items += value.count;
                }
                localStorage.setItem('cartCount', count_of_items)
                setcartCount(count_of_items)
                // console.log(cart_resp.data.map.map)
                console.log(parsedMap)
            }
            if (result.data.role === 'admin') {
                localStorage.setItem('admin', true)
            }
            // window.location.replace('/adminDashboard');

            navigate('/adminDashboard')
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