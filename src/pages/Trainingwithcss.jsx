import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/authContext';
import signin_img from "../assets/images/Sign_in_amico.png";
import GoogleSignin from "../hooks/GoogleSignin";
import api from '../services/api';

function Trainingwithcss() {
    const { cartToggled } = useAuth();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
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

                    navigate('/');
                }
            }
            catch (err) {
                if (err.message === "Network Error") {
                    console.log(err.message);
                    setMessage(err.message);
                }
                else {
                    console.log(err.response.data.fail);
                    setMessage(err.response.data.fail);
                }
            }
        }
        else {
            setMessage("fill all the data");
        }
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className={`flex justify-center items-center ${cartToggled ? 'blur' : ''}`}>
                <div className='flex justify-center items-center flex-col md:flex-row gap-5 mt-20 self-center mx-20 w-full '>
                    <div className='w-1/2 hidden md:block max-w-[500px] max-h-[500px] min-w-[400px] min-h-[400px]'>
                        <img className='' src={signin_img} alt="" />
                    </div>
                    <div className=' shadow-custom-shadow w-full md:w-1/2 flex items-center justify-center flex-col bg-cusgreen px-2 py-5 mx-2 rounded-lg max-w-[400px] max-h-[400px] min-w-[330px]'>
                        {message && <p className='text-red-600 font-bold'>{message}</p>}
                        <h1 className="font-sans font-bold text-white text-3xl ">Sign_up</h1>
                        <form onSubmit={handleSubmit}>
                            <label className='font-sans'>Name:</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} />
                            <label className='font-sans'>Email:</label>
                            <input className='border-black' type="email" name="email" value={formData.email} onChange={handleChange} />
                            <label className='font-sans'>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                            <button type="submit">Submit</button>
                        </form>
                        <div className='google_signin'>
                            <GoogleSignin />
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Trainingwithcss;
