import React from 'react';
import "../assets/css/DashAndHome.css"
import logo from "../assets/images/Logo1.png"
import logo1 from "../assets/images/Logo1.png"
import logo2 from "../assets/images/Logo2.png"
import logo3 from "../assets/images/Logo3.png"
import logo4 from "../assets/images/Logo4.png"



export default function Belowcarasule() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 pt-10">
            <div className="flex flex-col items-center gap-3">
                <h3 className='font-bold'>Our Clients</h3>
                <p>We have been working with some Fortune 500+ clients</p>
            </div>
            <div className='flex flex-row  gap-x-5 flex-wrap items-center justify-center'>
                <img src={logo} alt="" />
                <img src={logo1} alt="" />
                <img src={logo2} alt="" />
                <img src={logo3} alt="" />
                <img src={logo4} alt="" />
                <img src={logo1} alt="" />
                <img src={logo2} alt="" />
            </div>

        </div>
    )
}