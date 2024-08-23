import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import "../assets/css/App.css";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/Icon.png"
import { useAuth } from '../context/authContext';
import cartImg from "../assets/images/cart_icon.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const { logout, cartToggled, setCartToggled, cartItems } = useAuth();
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
    const Sidebar = () => {
        return (
            <div className='relative z-10 '>
                <div className=' absolute right-0 max-h-[400px] w-[300px] bg-cusgreen flex justify-center items-center transition-all duration-500 ease-in-out rounded-lg shadow-custom-shadow'>
                    <ul className='flex gap-5 flex-col py-2'>
                        {logedin && <li className='text-white font-medium hover:text-black'>
                            <div className='flex flex-row gap-5 items-center'>
                                <img className='max-w-[40px] rounded-[50%]' src={user_image} alt="" />
                                <p>{logedin}</p>
                            </div>
                        </li>}
                        <li className='text-white font-medium'><Link to="/Home">Home</Link></li>
                        {admin && <li className='text-white font-medium'><Link to="/adminDashboard">Dashboard</Link></li>}
                        <li className='text-white font-medium'><Link to="/product">Product</Link></li>
                        {!logedin && <li className='text-white font-medium'><Link to="/">Login</Link></li>}
                        {!logedin && <li className='text-white font-medium'><Link to="/signup">Sign up</Link></li>}
                        {logedin && <li className='text-white font-medium' onClick={Logout}>Logout</li>}
                        {/* {admin && <li><Link to="/admin">Admin</Link></li>} */}
                    </ul>
                </div>
            </div>
        )
    }

    // const Cart = () => {
    //     var totalprice = 0;
    //     for (const [key, value] of cartItems.entries()) {
    //         console.log(key + ": " + JSON.stringify(value));
    //     }
    //     const product = Array.from(cartItems).map(([key, value]) => {
    //         totalprice += value.props.price * value.count;
    //         return (
    //             <div className="cart_items" key={key}>
    //                 <p>{value.props.heading}</p>
    //                 <p>{value.count}</p>
    //             </div>
    //         )
    //     })
    //     return (
    //         <div className='cart_outer'>
    //             <div>
    //                 <p>Cart</p>
    //                 {product}
    //                 <p>Total  :{totalprice}</p>
    //             </div>
    //         </div>
    //     )
    // }


    const Togglesidebar = () => {
        setMenu(!menu)
    }
    // const setCart = () => {
    //     setCartToggled(!cartToggled);
    // }
    return (
        <div>
            <div className="flex flex-row justify-between items-center bg-[#F5F7FA]">
                <div className='flex pl-4'>
                    <img src={icon} alt="" />
                    <h3>Nexcent</h3>
                </div>
                <div className='hidden md:flex'>
                    <ul className='flex gap-16 flex-row'>
                        <li className='text-cusgreen font-medium hover:text-black'><Link to="/Home">Home</Link></li>
                        {admin && <li className='text-cusgreen font-medium hover:text-black'><Link to="/adminDashboard">Dashboard</Link></li>}
                        <li className='text-cusgreen font-medium hover:text-black'><Link to="/product">Product</Link></li>


                        {/* {admin && <li><Link to="/admin">Admin</Link></li>} */}
                    </ul>
                </div>


                {!logedin &&
                    <div className='flex float-end'>
                        <div className='hidden md:flex gap-4 py-2 pr-5'>
                            <Link to="/"><button className='bg-cusgreen px-6 py-2 mt-1 rounded-lg text-white hover:text-cusgreen hover:bg-white hover:shadow-lg'>Login</button></Link>
                            <Link to="/signup"><button className='bg-white shadow-lg px-4 py-2 mt-1 rounded-lg text-cusgreen hover:text-white hover:bg-cusgreen'>Sign up</button></Link>
                        </div>
                        <div className='pr-6 pt-4 flex flex-row gap-2 items-center justify-center p-2'>
                            <img className="transition max-w-[50px] max-h-[50px] shadow-lg rounded-[50%] hover:cursor-pointer" onClick={() => { navigate("/cart") }} src={cartImg} alt="cart" />
                            <FontAwesomeIcon icon={faBars} className='block md:hidden text-cusgreen font-bold text-2xl hover:cursor-pointer shadow-lg' onClick={Togglesidebar} />
                        </div>
                    </div>
                }
                {logedin && <div className='flex flex-row '>
                    <div className='hidden md:flex flex-row flex-end gap-2 p-2 pr-4'>
                        <img className="max-w-[40px] max-h-[40px] rounded-[50%]" src={user_image} alt="user_image" />
                        <button className='font-bold hover:underline5'>{logedin}</button>
                        <button onClick={Logout} className='bg-white shadow-lg px-4 py-2 mt-1 rounded-lg text-cusgreen hover:text-white hover:bg-cusgreen font-medium'>logout</button>
                        {/* <Link to="/signup" className="cart_icon">Cart</Link> */}
                        {/* <img className="transition max-w-[50px] max-h-[50px] shadow-lg rounded-[50%] hover:cursor-pointer" onClick={setCart} src={cartImg} alt="cart" /> */}
                    </div>
                    <div className='pr-6 pt-4 flex flex-row gap-2 items-center justify-center p-2'>
                        <img className="transition max-w-[50px] max-h-[50px] shadow-lg rounded-[50%] hover:cursor-pointer" onClick={() => { navigate("/cart") }} src={cartImg} alt="cart" />
                        <FontAwesomeIcon icon={faBars} className='block md:hidden text-cusgreen font-bold text-2xl hover:cursor-pointer shadow-lg ' onClick={Togglesidebar} />
                    </div>
                </div>
                }
            </div>
            <Outlet />
            {/* {cartToggled && <Cart />} */}
            {menu && <Sidebar />}
        </div>
    );
}