import React from "react";
import axios from 'axios';
import "../assets/css/App.css";
import api from "../services/api";

export default function Deleteitem(props) {
    const del_id = async () => {
        if (props.id) {
            try {
                const response = await api.product_changes('/delete_product_items', { id: props.id })
                window.location.reload();
            }
            catch (err) {
                console.log(err.response)
            }
        }
        else {
            console.log('No id Present');
        }
    }
    return (
        <button className="bg-cusgreen text-white px-1 rounded-md hover:text-black hover:bg-gray-300" onClick={del_id}>Delete</button>
    )
}