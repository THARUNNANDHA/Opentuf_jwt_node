import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import "../assets/css/App.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import icon from "../assets/images/Icon.png"
import { useAuth } from '../context/authContext';
export default function Navbar() {
    const navigate = useNavigate()
    const { logout } = useAuth();
    var logedin = localStorage.getItem("user");
    var user_image = localStorage.getItem("user_image");
    console.log(user_image)
    var admin = false;

    // console.log(user_data.email, user_data.password, user_data.name)
    // if (user_data.email !== "") {
    //     logedin = true;
    //     console.log("inside nav")
    // }
    // if (user_data.email === "admin@gmail.com") {
    //     admin = true;
    // }

    const Logout = async () => {
        const res = await logout();
        console.log(res);
        if (res) {
            navigate('/')
        }
    }
    return (
        <div>
            <div className='outer'>
                <div className='logo_img'>
                    <img src={icon} alt="" />
                    <h3>Nexcent</h3>
                </div>
                <div>
                    <ul className='list_items'>
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>

                        {admin && <li><Link to="/admin">Admin</Link></li>}
                    </ul>
                </div>

                {!logedin && <div className='signin_login'>
                    <Link to="/"><button className='sign_button'>Login</button></Link>
                    <Link to="/signup"><button className='login_button'>Sign up</button></Link>
                </div>
                }
                {logedin && <div>


                    <div className='signin_login'>
                        <img src={user_image} alt="user_image" />
                        <button className='sign_button'>{logedin}</button>
                        <button onClick={Logout} className='login_button'>logout</button>
                    </div>
                </div>
                }
            </div>
            <Outlet />
        </div>
    );
}