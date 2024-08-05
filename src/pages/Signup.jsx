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
function Signup() {
    const { cartToggled } = useAuth();
    const [GoogleUserdata, setGoogleUserdata] = useState()
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if (formData.username !== "" && formData.email !== "" && formData.password !== "") {
            axios.post('http://localhost:3000/signup', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log('Response:', response.data);
                    if (response.data.fail) {
                        console.log(response.data.fail);
                        alert(response.data.fail);
                    }
                    else if (response.data.success) {
                        console.log(response.data.success);
                        alert(response.data.success);
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.error('Error sending data:', error.response ? error.response.data : error.message);
                });
        }
        else {
            alert("fill all the data");
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

