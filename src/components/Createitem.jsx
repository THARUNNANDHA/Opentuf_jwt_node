import React, { useState } from 'react';
import "../assets/css/App.css";
// import axios from 'axios';
import api from '../services/api';

export default function Createitem(props) {
    const [formData, setFormData] = useState({
        image_src: '',
        description: '',
        price: 0,
        title: ''
    });
    const [showForm, setShowForm] = useState(false);

    const changes_handler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submit_changes = async (e) => {
        e.preventDefault();
        const already_exist_name = props.data.some(user => user.title === formData.title);
        try {
            if (!already_exist_name) {
                const response = await api.product_changes("/create_product_item", { "formData": formData })
                window.location.reload();
            } else {
                alert("Already exist title");
            }
        }
        catch (err) {
            console.log(err.response)
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className='create_outer_form'>
            <button onClick={toggleForm} className="create_btn">Create Item</button>
            {showForm && (
                <div className='outer_create_form'>

                    <form onSubmit={submit_changes} className='create_form'>
                        <h3 style={{ textAlign: "center", margin: "0", color: "white" }}>Create Item</h3>
                        <div style={{ height: "10px" }}>
                            <i className="fa-solid fa-xmark create_form_close" onClick={toggleForm}></i>
                        </div>
                        <label htmlFor="">Title</label>
                        <input name="title" type="text" onChange={changes_handler} value={formData.title} />
                        <label htmlFor="">Description</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={changes_handler} value={formData.description}></textarea>
                        <label htmlFor="">Price</label>
                        <input name="price" type="number" onChange={changes_handler} value={formData.price} />
                        <label htmlFor="">Image_src</label>
                        <select name="image_src" id="" onChange={changes_handler} value={formData.image_src}>
                            <option value="None">-</option>
                            <option value="pic_cara.png">pic_cara.png</option>
                            <option value="rafiki.png">rafiki.png</option>
                        </select>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}
