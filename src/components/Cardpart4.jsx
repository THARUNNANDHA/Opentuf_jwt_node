import React from 'react';
import "../css/Part4.css"
export default function Cardpart4(props){
    return(
        <div className="outer_Cardpart4">
            <div className='card_Cardpart4'>
                 <img src={props.src} alt="" />
                 <h2>{props.heading}</h2>
                 <p>{props.para}</p>
            </div>
            
        </div>
    )
}