import React, { useState } from 'react';
import "../assets/css/App.css";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
// import axios from 'axios';


function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
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
        // // const{email} = formData
        // axios.post("/login", { "email": formData.email, "password": formData.password })
        //     // .then((response) => console.log(response))
        //     .then(response => {
        //         console.log("response", response.data)
        //         if (response.data.admin === "admin")
        //             navigate("/admin")
        //         else if (response.data.success === "correct credentials")
        //             navigate("/")
        //         else alert(response.data.fail)
        //     })
        //     .catch((error) => console.log(error));
        // // console.log("result ",exist_email,match_password)
    };

    return (
        <div className='Signup_outer'>
            {/* {users.map(user=>(
                        <h1>{user.username}</h1>
                    ))} */}
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            <div className='forgot-signup'>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}

export default Login;