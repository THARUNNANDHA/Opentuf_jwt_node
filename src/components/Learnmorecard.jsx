import React from "react";
import '../css/index.css';
export default function Learnmorecard(data){
    return(
        <div className="Learnmorecard_outer">
            <div className="Learnmorecard_images">
                <img src={data.src} alt="" />
            </div>
            <div className="Learnmorecard_contents">
                <h3>{data.heading}</h3>
                <p>{data.para}</p>
                <button>Learn more</button>
            </div>
        </div>
    )
}