import React, { useState, useEffect } from 'react';
import Productdisplaycard from "./components/Productdisplaycard"
// import im from "./images/rafiki.png"
import Createitem from "./components/Createitem"
import Navbar from './components/Navbar';
import Checksession from './hooks/Checksession';

export default function Products_display() {
    const user_check = Checksession('/session_check');
    const [users, setUsers] = useState([]);
    var user_exist = false
    if (user_check.email == "admin@gmail.com") {
        user_exist = true;
    }
    console.log("user_exists", user_exist)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/product_item_data");
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const product_list = users.map(user => {
        if (!user.image_src) {
            // Handle case where image_src is undefined
            return null; // Skip rendering this product card
        }
        return (
            <Productdisplaycard
                key={user.id}
                src={require(`./images/${user.image_src}`)}
                heading={user.title}
                para={user.description}
                price={user.price}
                id={user.id}
                admin={user_exist}
            />
        )
    })
    return (
        <div>
            <Navbar user_data={user_check} />
            <div className='all_outer_product_data' >
                {user_exist && <Createitem data={users} />}
                <div className='outer_product_data'>
                    {product_list}
                </div>
            </div>
        </div>

    )
}