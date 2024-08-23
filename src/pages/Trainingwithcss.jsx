import React from "react";
import "../assets/css/App.css";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";


export default function Cart() {
    const { cartItems } = useAuth();
    var totalprice = 0;
    for (const [key, value] of cartItems.entries()) {
        console.log(key + ": " + JSON.stringify(value));
    }
    const product = Array.from(cartItems).map(([key, value]) => {
        totalprice += value.props.price * value.count;
        return (
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 shadow-lg mt-5 p-4 sm:p-6" key={key}>
                <img className="w-32 h-32 sm:max-w-40 sm:max-h-40 object-cover" src={value.props.src} alt="" />
                <div className="flex flex-col justify-center">
                    <p className="text-lg sm:text-xl">{value.props.heading}</p>
                    <p className="text-sm sm:text-base">Quantity: {value.count}</p>
                </div>
            </div>
        )
    })
    return (
        <div>
            <div><Navbar /></div>
            <div className="flex flex-col lg:flex-row items-center justify-center mt-5 gap-5 px-4 lg:px-0">
                <div className="shadow-lg flex flex-col items-center justify-between w-full md:w-[60%] overflow-y-auto max-h-[600px] p-4 relative">
                    <p className="text-lg sm:text-xl">Cart</p>
                    {product}
                    <div className="absolute bottom-0 w-full bg-white p-4">
                        <p className="text-lg sm:text-xl font-semibold">Total: {totalprice}</p>
                    </div>
                </div>
                <div className="shadow-lg flex flex-col items-center justify-center w-full lg:w-[30%] bg-gray-200 min-h-[450px] max-h-[600px] p-4">
                    <p className="text-lg sm:text-xl">tharun</p>
                </div>
            </div>
        </div>
    )
}