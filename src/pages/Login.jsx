import React, { useState } from 'react';
import "../assets/css/App.css";
import { useNavigate, useHis } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext';
import Navbar from '../components/Navbar';
// import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleOneTapLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode'
// import google_signin from "../assets/images/image.png"
import login_img from "../assets/images/Tablet_login_pana.png"
import GoogleSignin from "../hooks/GoogleSignin"

function Login() {
    const [message, setmessage] = useState(null)
    const { login, setGoogleUserdata, GoogleUserdata, cartToggled } = useAuth();
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
            try {
                const res = await login(formData);
                navigate(res)
            }
            catch (err) {
                if (err.message === "Network Error") {
                    console.log(err.message);
                    setmessage(err.message);
                }
                else {
                    console.log(err.response.data.fail);
                    setmessage(err.response.data.fail);
                }
            }
            // if (res.admin) {
            //     localStorage.setItem('admin', res.admin)
            //     navigate("/dashboard")
            // }
            // else if (res) {
            //     navigate("/home")
            // }


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
        else {
            setmessage("Enter all the data")
        }


    };




    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='flex justify-center items-center'>
                <div className={`flex justify-center items-center flex-col md:flex-row gap-5 mt-20 self-center mx-20 w-full ${cartToggled ? 'blur' : ''} `}>
                    <div className='w-1/2 hidden md:block max-w-[500px] max-h-[500px] min-w-[400px] min-h-[400px]' >
                        <img src={login_img} alt="login_img" />
                    </div>
                    <div className='shadow-custom-shadow w-full md:w-1/2 flex items-center justify-center flex-col bg-cusgreen px-2 py-5 mx-2 rounded-lg max-w-[400px] max-h-[400px] min-w-[330px]'>
                        {message && <p className='text-red-600 font-bold'>{message}</p>}
                        {/* {users.map(user=>(
                        <h1>{user.username}</h1>
                    ))} */}
                        <h1 className="font-sans font-bold text-white text-3xl">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <label className='font-sans'>Email:</label>
                            <input type="email" name="username" value={formData.username} onChange={handleChange} />
                            <label className='font-sans'>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                            <button type="submit">Submit</button>
                        </form>
                        <div className='forgot-signup'>
                            <Link to="/signup">Signup</Link>
                            <Link to="/forgot_password">forgot_password</Link>
                        </div>
                        <div>
                            <GoogleSignin />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;