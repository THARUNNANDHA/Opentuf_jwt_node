import React from 'react';
import Deleteitem from "./Deleteitem"
import "../css/Part4.css"
import Updateitems from "./Updateitems"
export default function Productdisplaycard(props) {
    // consol.log(props.id)
    // console.log(props.id)
    return (
        <div className="outer_Productdisplaycard">
            <div className='card_Productdisplaycard'>
                {props.admin && <div>
                    <Deleteitem id={props.id} />
                    <Updateitems data={props} /></div>}
                <img src={props.src} alt="" />
                <h2>{props.heading}</h2>
                <p>{props.para}</p>
                <strong><p>Price: {props.price}</p></strong>
            </div>

        </div>
    )
}