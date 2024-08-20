import React from "react";
// import Part4 from './Part4';
import Navbar from "../components/Navbar"
import { useAuth } from "../context/authContext";
import Belowcarasule from "../components/Belowcarasule";
import redeme2 from "../assets/images/pana.png"
import Learnmorecard from "../components/Learnmorecard"

export default function Homepage() {
    var user = false
    user = localStorage.getItem("user");
    if (user === false) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {user &&
                <div>
                    <Navbar />
                    <Belowcarasule />
                    <Learnmorecard
                        src={redeme2}
                        heading="How to design your site footer like we did"
                        para="Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida."
                    />
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