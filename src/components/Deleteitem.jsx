import React from "react";
import axios from 'axios';
import "../assets/css/App.css";

export default function Deleteitem(props) {
    const del_id = () => {
        if (props.id) {
            axios.post('http://localhost:3000/delete_product_items', { id: props.id })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                });
            window.location.reload();
            alert('Deleted successfully');
            console.log(props.id);
        }
        else {
            console.log('No id Present');
        }
    }
    return (
        <button className="del_button" onClick={del_id}>Delete</button>
    )
}