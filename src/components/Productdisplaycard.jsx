import React, { useEffect } from 'react';
import Deleteitem from "./Deleteitem"
import "../assets/css/App.css";
import Updateitems from "./Updateitems"
import { useCart } from '../context/CartProvider';
import { cart } from '../services/api';
export default function Productdisplaycard(props) {
    const { cartItems, setCartItems, cartCount, setcartCount } = useCart();
    // useEffect(() => {
    //     if (cartItems.size === 0) {
    //         console.log("cart null");
    //         if (localStorage.getItem('cart')) {
    //             console.log("cart_fetched");
    //             const parsedMap = new Map(JSON.parse(localStorage.getItem('cart')));
    //             setCartItems(parsedMap)
    //         }
    //     }
    // }, []);

    // consol.log(props.id)
    // console.log(props.id)
    const addItemCart = (props) => {
        var count_of_items = 0;
        if (cartItems.size === 0) {
            console.log("cart null");
            if (localStorage.getItem('cart')) {
                console.log("cart_fetched");
                const parsedMap = new Map(JSON.parse(localStorage.getItem('cart')));
                setCartItems(parsedMap)
            }
        }
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
            // console.log(key + ": " + JSON.stringify(value));
            count_of_items += value.count;
        }
        setCartItems(updatedCart)
        setcartCount(count_of_items)
        const serializedCartItems = JSON.stringify(Array.from(cartItems.entries()));
        localStorage.setItem('cart', serializedCartItems)
        localStorage.setItem('cartCount', count_of_items)
    }
    return (
        <div className="flex flex-wrap gap-4 sm:gap-6 w-full lg:gap-8 pt-10">
            <div className='flex flex-col  border-black-300 border-2 min-w-72 w-full h-[24rem] relative p-1 gap-2 '>
                {props.admin && < div className='top-0 absolute'>
                    <Deleteitem id={props.id} />
                    <Updateitems data={props} />
                </div>}
                <div className='w-full flex items-center justify-center mt-10'>
                    <img className=" w-[75%] max-h-52 h-48 object-cover items-center rounded-sm" src={props.src} alt="" />
                </div>
                <div className='flex items-center justify-center flex-col'>
                    <h2 className='text-center text-xl font-bold'>{props.heading}</h2>
                    <p className='text-center'>Price: {props.price}</p>
                    <p className='text-center text-sm mt-2 line-clamp-2 max-w-60'>{props.para}</p>
                </div>
                <button className='absolute bottom-0 text-center text-white w-full bg-cusgreen p-1 hover:text-current right-[0.5px] hover:bg-gray-300 ' onClick={() => addItemCart(props)}>Add to cart</button>
            </div>

        </div >
    )
}