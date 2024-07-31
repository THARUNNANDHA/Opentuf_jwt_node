import React from 'react';
import Deleteitem from "./Deleteitem"
import "../assets/css/App.css";
import Updateitems from "./Updateitems"
import { useAuth } from '../context/authContext';
export default function Productdisplaycard(props) {
    const { cartItems, setCartItems } = useAuth();
    // consol.log(props.id)
    // console.log(props.id)
    const addItemCart = (props) => {
        const updatedCart = new Map(cartItems)
        console.log("id of product ", props.id)
        if (!updatedCart.has(props.id)) {
            updatedCart.set(props.id, { props: props, count: 1 })
        }
        else {
            const item = updatedCart.get(props.id);
            item.count += 1;
            updatedCart.set(props.id, item)
        }
        for (const [key, value] of updatedCart.entries()) {
            console.log(key + ": " + JSON.stringify(value));
        }
        setCartItems(updatedCart)
    }
    return (
        <div className="outer_Productdisplaycard">
            <div className='card_Productdisplaycard'>
                {props.admin && < div >
                    <Deleteitem id={props.id} />
                    <Updateitems data={props} />
                </div>}
                <img src={props.src} alt="" />
                <h2>{props.heading}</h2>
                <p>{props.para}</p>
                <strong><p>Price: {props.price}</p></strong>
                <button onClick={() => addItemCart(props)}>Add to cart</button>
            </div>

        </div >
    )
}