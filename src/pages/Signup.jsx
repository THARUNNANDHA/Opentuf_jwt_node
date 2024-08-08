import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/css/App.css";
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import signin_img from "../assets/images/Sign_in_amico.png"
import GoogleSignin from "../hooks/GoogleSignin"
import { useAuth } from '../context/authContext';
import api from '../services/api';
function Signup() {
    const { cartToggled } = useAuth();
    const [message, setmessage] = useState()
    // const [validated_state, setvalidated_state] = useState([])
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        if (formData.username !== "" && formData.email !== "" && formData.password !== "") {
            try {
                const response = await api.signup('/signup', formData)
                console.log('Response:', response);
                if (response.data.success) {
                    console.log(response.data.success);
                    // alert(response.data.success, "success");
                    navigate('/');
                }
            }
            catch (err) {
                // alert(err.response.data.fail, "error");
                console.log(err.response.data.fail);
                setmessage(err.response.data.fail);
            }
            // axios.post('http://localhost:3000/signup', formData, {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            //     .then(response => {
            //         console.log('Response:', response.data);
            //         if (response.data.fail) {
            //             console.log(response.data.fail);
            //             alert(response.data.fail);
            //         }
            //         else if (response.data.success) {
            //             console.log(response.data.success);
            //             alert(response.data.success);
            //             navigate('/');
            //         }
            //     })
            //     .catch(error => {
            //         console.error('Error sending data:', error.response ? error.response.data : error.message);
            //     });
        }
        else {
            setmessage("fill all the data");
        }
    }


    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className={`img_form_signin ${cartToggled ? 'blur' : ''}`}>
                <div className='login_img_div'>
                    <img src={signin_img} alt="signin_img" />
                </div>
                <div className='Signup_outer'>
                    {message && <p className='error_mess'>{message}</p>}
                    <h1>Sign_up</h1>

                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        <button type="submit">Submit</button>
                    </form>
                    <div className='google_signin'>
                        <GoogleSignin />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

