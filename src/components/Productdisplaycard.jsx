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
        <div className="">
            <div className='flex flex-col shadow-lg min-w-72 max-w-60 h-[24rem] relative p-1 gap-2 '>
                {props.admin && < div className='top-0 absolute'>
                    <Deleteitem id={props.id} />
                    <Updateitems data={props} />
                </div>}
                <div className='w-full flex flex-col mt-6'>
                    <img className="max-h-52 h-48 object-cover items-center rounded-sm" src={props.src} alt="" />
                </div>
                <h2 className='text-center text-xl font-bold'>{props.heading}</h2>
                <p className='text-center'>Price: {props.price}</p>
                <p className='text-center text-sm mt-2 line-clamp-2'>{props.para}</p>
                <button className='absolute bottom-0 text-center text-white w-full bg-cusgreen p-1 hover:text-current right-[0.5px] hover:bg-gray-300 ' onClick={() => addItemCart(props)}>Add to cart</button>
            </div>

        </div >
    )
}