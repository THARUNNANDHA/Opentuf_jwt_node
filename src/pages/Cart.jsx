import React, { useState, useEffect } from "react";
import "../assets/css/App.css";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Cart() {
    const navigate = useNavigate();
    const [promoinput, setPromoinput] = useState();
    const [promodis, setPromodis] = useState(0);
    const { cartItems, setCartItems } = useAuth();
    var totalprice = 0;
    var num_prod = 0;
    var gst = 0
    var promodiscount = 0;
    var promolist = {
        'tharun': 10
    }
    const [promo, setPromo] = useState(0);

    useEffect(() => {
        // cartItems.forEach((value) => {

        //     console.log(promodis)
        //     // newNumProd += value.count;
        // });
        promodiscount = (totalprice * promo) / 100
        setPromodis(promodiscount)
    }, [cartItems, promo])


    // for (const [key, value] of cartItems.entries()) {
    //     console.log(key + ": " + JSON.stringify(value));
    // }
    const quantity = (val, id) => {
        const newCartItems = new Map(cartItems);
        const item = newCartItems.get(id)
        if (item) {
            item.count += val;
            if (item.count > 0) newCartItems.set(id, item);
            else newCartItems.delete(id);
            setCartItems(newCartItems)
        }
    }

    const product = Array.from(cartItems).map(([key, value]) => {
        totalprice += value.props.price * value.count;
        num_prod += value.count;
        gst = (totalprice * 18) / 100
        gst = Math.floor(gst)

        // setPromodis(promodiscount)
        return (
            <div className="flex flex-wrap sm:flex-row items-center justify-between mb-7 p-5 shadow-lg" key={key}>
                <img className="w-24 h-24 sm:w-36 sm:h-36 object-cover" src={value.props.src} alt="" />
                <div className="max-w-[20%]">
                    <p className="text-sm sm:text-base font-bold">{value.props.heading}</p>
                    <p className="text-sm">{value.props.para}</p>
                </div>
                <div>
                    <p className="font-bold text-sm sm:text-base pb-1">quantity</p>
                    <div className="flex flex-row gap-2">
                        <FontAwesomeIcon className="bg-gray-300 p-1 cursor-pointer text-sm sm:text-base " icon={faMinus} onClick={() => { quantity(-1, value.props.id) }}></FontAwesomeIcon>
                        <p>{value.count}</p>
                        <FontAwesomeIcon className="bg-gray-300 p-1 cursor-pointer text-sm sm:text-base" icon={faPlus} onClick={() => { quantity(+1, value.props.id) }}></FontAwesomeIcon>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-sm sm:text-base">Total Cost</p>
                    <p className="text-sm sm:text-base">{value.count * value.props.price}</p>
                </div>
            </div>
        )
    })

    const Promo = () => {
        console.log("hear", promoinput, promolist[promoinput])
        if (promolist[promoinput]) {
            const promo_per = promolist[promoinput]
            setPromo(promo_per)
        }
    }

    const changeHandle = (e) => {
        setPromoinput(e.target.value)
    }
    return (
        <div>
            <div><Navbar /></div>
            <div className="md:ml-10 ml-5 flex justify-center w-[95%]">
                <div className='flex flex-col md:flex-row  justify-center sm:mt-20 pb-6 shadow-xl w-full gap-5'>
                    <div className="w-full md:w-[60%] flex flex-col max-h-[550px] relative justify-between overflow-auto ">
                        <div className="overflow-y-auto">
                            <div className="flex justify-between" >
                                <p className="font-bold text-2xl ">Cart Items</p>
                                <p className="font-bold text-lg pr-5">{num_prod} Items</p>
                            </div>
                            {product}
                        </div>
                        <div className="absolute bottom-0 w-full  bg-cusgreen p-1">
                            <p className="underline cursor-pointer text-white" onClick={() => {
                                navigate("/product")
                            }}>Continue Shopping</p>

                        </div>
                    </div>
                    <div className="w-full md:w-[30%] bg-slate-200 min-h-[550px] flex flex-col relative">

                        <p className="relative before:content-[''] before:absolute before:border-b-2 before:w-[80%] before:left-[10%] before:bottom-0 before:border-gray-500 font-bold text-2xl text-center pb-10 p-2">Order Summary</p>

                        <div className="flex flex-col w-full justify-center gap-5 pl-5 mt-5">
                            <p className="font-bold">Promo Code</p>
                            <input className="w-[80%] after" type="text" onChange={changeHandle} />
                            <button className="bg-cusgreen w-[50%] p-1 text-white hover:text-cusgreen hover:bg-white" onClick={Promo}>Apply</button>

                            <div className="relative pb-4 before:absolute before:bottom-0 before:w-[95%] before:border-b-2 before:border-gray-500">
                                <p className="font-bold relative text-center">Your Content Here</p>
                            </div>
                            <p className="flex justify-between">
                                <span >Sub Total:</span>
                                <span className="pr-10">₹ {totalprice}</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Tax (18%) :</span>
                                <span className="pr-10">₹ {gst}</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Promo ({promo}%) :</span>
                                <span className="pr-10">-₹ {promodis}</span>
                            </p>
                            <p className="flex justify-between relative before:content-[''] before:absolute before:w-[95%] pb-6 before:bottom-0 before:border-gray-500 before:border">
                                <span>Shipping:</span>
                                <span className="pr-10">₹ {100}</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Total:</span>
                                <span className="pr-10">₹ {totalprice + gst + 100 - promodis}</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}