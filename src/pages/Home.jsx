import React from "react";
// import Part4 from './Part4';
import Navbar from "../components/Navbar"
import { useAuth } from "../context/authContext";
import Belowcarasule from "../components/Belowcarasule";

export default function Homepage() {
    const user = localStorage.getItem("user");
    if (user === null) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {user &&
                <div>
                    <Navbar />
                    <Belowcarasule />
                    {/* <Part4 /> */}
                </div>
            }
            {!user &&
                <div>
                    <Navbar />
                    <h1>login first</h1>
                </div>
            }
        </div>
    )
}