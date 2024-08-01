import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import "../assets/css/App.css";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/Icon.png"
import { useAuth } from '../context/authContext';
import cartImg from "../assets/images/cart_icon.jpg"
export default function Navbar() {
    const navigate = useNavigate()
    const { logout, cartToggled, setCartToggled, setCartItems, cartItems } = useAuth();
    var logedin = localStorage.getItem("user");
    var user_image = localStorage.getItem("user_image");
    // console.log(user_image)/
    // console.log(user_image)
    var admin = false;
    if (localStorage.getItem("admin")) {
        admin = localStorage.getItem("admin");
        // console.log(admin)
    }


    // console.log(user_data.email, user_data.password, user_data.name)
    // if (user_data.email !== "") {
    //     logedin = true;
    //     console.log("inside nav")
    // }
    // if (user_data.email === "admin@gmail.com") {
    //     admin = true;
    // }
    const handleLogoutSuccess = () => {
        console.log("Logout successful");
    };

    const handleLogoutError = () => {
        console.log("Logout unsuccessful");
    };

    const Logout = async () => {
        const res = await logout();
        try {
            googleLogout();
            handleLogoutSuccess();
        } catch (error) {
            handleLogoutError();
        }
        console.log(res);
        if (res) {
            navigate('/')
        }
    }

    const Cart = () => {
        var totalprice = 0;
        for (const [key, value] of cartItems.entries()) {
            console.log(key + ": " + JSON.stringify(value));
        }
        const product = Array.from(cartItems).map(([key, value]) => {
            totalprice += value.props.price * value.count;
            return (
                <div className="cart_items" key={key}>
                    <p>{value.props.heading}</p>
                    <p>{value.count}</p>
                </div>
            )
        })
        return (
            <div className='cart_outer'>
                <div>
                    <p>Cart</p>
                    {product}
                    <p>Total  :{totalprice}</p>
                </div>
            </div>
        )
    }
    const setCart = () => {
        setCartToggled(!cartToggled);
    }
    return (
        <div>
            <div className="outer">
                <div className='logo_img'>
                    <img src={icon} alt="" />
                    <h3>Nexcent</h3>
                </div>
                <div>
                    <ul className='list_items'>
                        <li><Link to="/Home">Home</Link></li>
                        {admin && <li><Link to="/dashboard">Dashboard</Link></li>}
                        <li><Link to="/product">Product</Link></li>

                        {/* {admin && <li><Link to="/admin">Admin</Link></li>} */}
                    </ul>
                </div>

                {!logedin && <div className='signin_login'>
                    <Link to="/"><button className='sign_button'>Login</button></Link>
                    <Link to="/signup"><button className='login_button'>Sign up</button></Link>
                    <img className="cart_icon" onClick={setCart} src={cartImg} alt="cart" />
                </div>
                }
                {logedin && <div>
                    <div className='signin_login'>
                        <img src={user_image} alt="user_image" />
                        <button className='sign_button'>{logedin}</button>
                        <button onClick={Logout} className='login_button'>logout</button>
                        {/* <Link to="/signup" className="cart_icon">Cart</Link> */}
                        <img className="cart_icon" onClick={setCart} src={cartImg} alt="cart" />
                    </div>
                </div>
                }
            </div>
            <Outlet />
            {cartToggled && <Cart />}
        </div>
    );
}