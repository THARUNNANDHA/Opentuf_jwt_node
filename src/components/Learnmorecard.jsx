import React from "react";
import "../assets/css/App.css";
export default function Learnmorecard(data) {
    return (
        <div className="flex flex-col w-full items-center justify-center pt-10 md:flex-row m-0 gap-10 md:gap-0">
            <div className="flex md:w-2/5 px-5 w-1/2 items-center justify-center min-w-96">
                <img src={data.src} alt="" />
            </div>
            <div className="md:w-3/5 text-center flex flex-col gap-5 px-10 w-full">
                <h3 className="font-bold text-3xl text-left">{data.heading}</h3>
                <p className="text-justify">{data.para}</p>
                <button className="bg-cusgreen p-2 max-w-36">Learn more</button>
            </div>
        </div>
    )
}