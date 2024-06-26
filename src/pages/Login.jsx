import React, { useState } from 'react';
import "../assets/css/App.css";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext';
import Navbar from '../components/Navbar';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import google_signin from "../assets/images/image.png"
import login_img from "../assets/images/Tablet_login_pana.png"
import GoogleSignin from "../hooks/GoogleSignin"

function Login() {

    const { login, setGoogleUserdata, GoogleUserdata } = useAuth();
    // useGoogleOneTapLogin({
    //     onSuccess: credentialResponse => {
    //         console.log(jwtDecode(credentialResponse.credential));
    //         setGoogleUserdata(jwtDecode(credentialResponse.credential))
    //         console.log(GoogleUserdata)
    //     },
    //     onError: () => {
    //         console.log('Login Failed');
    //     },
    // });


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
            <div className="img_form_signin">
                <div className='login_img_div' >
                    <img src={login_img} alt="login_img" />
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
                    <div>
                        <GoogleSignin />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;