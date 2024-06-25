import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/css/App.css";
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

function Signup() {
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
        console.log(formData)
        if (formData.username != "" && formData.email != "" && formData.password != "") {

            axios.post('http://localhost:5000/signup', formData)
                .then(response => {
                    if (response.data.fail) {
                        console.log(response.data.fail);
                        alert(response.data.fail);
                    }
                    else if (response.data.success) {
                        console.log(response.data.success);
                        alert(response.data.success);
                        navigate('/home');
                    }
                })
                .catch(error => {
                    console.error('Error sending data:', error.response.data);
                });
        }
        else {
            alert("fill all the data")
        }
    }

    return (
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
        </div>
    );
}

export default Signup;

