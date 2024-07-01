import React from "react";
import "../css/Part4.css"

export default function Statusdisplay(data){
    return(
        <div className="Statusdisplay_outer">
            <div className="Statusdisplay_image">
                <img src={data.scr} alt="" />
            </div>
            <div className="Statusdisplay_content">
                <h3>{data.heading}</h3>
                <p>{data.para}</p>
            </div>
        </div>
    )
}