import React, { useState } from 'react';
import "../assets/css/App.css";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext';
import Navbar from '../components/Navbar';


function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
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
        if (formData.email !== "" && formData.password !== "") {
            const res = await login(formData);
            console.log(res);
            if (res) {
                navigate("/dashboard")
            }
            // axios.post("http://localhost:5000/login", formData, { withCredentials: true })
            //     .then(response => {
            //         console.log("response", response.data)
            //         if (response.data.admin === "admin")
            //             navigate("/admin")
            //         else if (response.data.success) {
            //             console.log("successful")
            //             console.log(response.data.Access_token)

            //         }

            //         else alert(response.data.fail)
            //     })
            //     .catch((error) => console.log(error));
        }
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='Signup_outer'>
                {/* {users.map(user=>(
                        <h1>{user.username}</h1>
                    ))} */}
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" name="username" value={formData.username} onChange={handleChange} />
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
                <div className='forgot-signup'>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;