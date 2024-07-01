import React from 'react';
import "./css/Below_carasule.css"
import logo from "./images/Logo.png"
import logo1 from "./images/Logo (1).png"
import logo2 from "./images/Logo (2).png"
import logo3 from "./images/Logo (3).png"
import logo4 from "./images/Logo (4).png"



export default function Belowcarasule() {
    return (
        <div className="outer_below_carasole">
            <div className="heading_below_carasole">
                <h3>Our Clients</h3>
                <p>We have been working with some Fortune 500+ clients</p>
            </div>
            <div className='logos_below_carasole'>
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