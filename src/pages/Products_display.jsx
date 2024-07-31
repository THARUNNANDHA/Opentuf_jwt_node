import React, { useState, useEffect, useMemo } from 'react';
import Productdisplaycard from "../components/Productdisplaycard";
import Createitem from "../components/Createitem";
import Navbar from '../components/Navbar';
import "../assets/css/App.css";
import api from '../services/api';
import { useAuth } from '../context/authContext';

export default function Products_display() {
    const { accesstoken, refreshAccessToken, fetchdata } = useAuth();
    const [users, setUsers] = useState([]);
    var user_exist = false;
    if (localStorage.getItem('admin')) {
        user_exist = localStorage.getItem('admin');
    }
    const refresh_tokne = localStorage.getItem('refreshToken');

    // console.log("user_exists", user_exist);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchdata("/product_data")
            if (data != null) {
                setUsers(data)
            }
            // try {
            //     var access = accesstoken;
            //     if (access == null) {
            //         access = await refreshAccessToken();
            //     }
            //     const response = await api.fetchdataProduct("/product_data", { headers: { 'Authorization': `Bearer ${access}` } });
            //     setUsers(response.data);
            //     console.log(response.data);
            // } catch (err) {
            //     console.error("error", err.response.data.fail);
            //     if (err.response.data.fail) {
            //         access = await refreshAccessToken();
            //         try {
            //             const response = await api.fetchdataProduct("/product_data", { headers: { 'Authorization': `Bearer ${access}` } });
            //             setUsers(response.data);
            //         } catch (err) {
            //             console.error(err);
            //         }
            //     }
            // }
        };

        fetchData();
    }, []);

    const product_list = useMemo(() => {
        if (!users) {
            return null; // or return some default value or component
        }
        return users.map(user => {
            if (!user.image_src) {
                // Handle case where image_src is undefined
                return null; // Skip rendering this product card
            }
            return (
                <Productdisplaycard
                    key={user.id}
                    src={require(`../assets/images/${user.image_src}`)}
                    heading={user.title}
                    para={user.description}
                    price={user.price}
                    id={user.id}
                    admin={user_exist}
                    count={0}
                />
            );
        });
    }, [users]);

    return (
        <div>
            <Navbar />
            {refresh_tokne && users && (
                <div className='all_outer_product_data'>
                    {user_exist && <Createitem data={users} />}
                    <div className='outer_product_data'>
                        {product_list}
                    </div>
                </div>
            )}
        </div>
    );
}
