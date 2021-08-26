import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from '../ReactUI/SimpleModal';

const CreateGear = React.forwardRef((props, ref) => {
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const [bolbs, setBolbs] = useState([]);
    const [gearName, setGearName] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [purchasedDay, setPurchasedDay] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [params, setParams] = useState(new FormData());
    
    const handleImageChange = (event) => {
        let bolbUrls = Array();
        const len = event.target.files["length"];
        for (let i=0; i<len; i++){
            const image = event.target.files[i];
            bolbUrls.push(URL.createObjectURL(image));
            params.append(`${i}`, image);
        }
        setBolbs(bolbUrls);
    };
    
    const handleGearNameChange = (event) => {
        setGearName(event.target.value);
    };
    
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    
    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };
    
    const handlePurchasedDayChange = (event) => {
        setPurchasedDay(event.target.value);
    };
    
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    
    
    const handleSubmit = (event) => {
        alert('保存しました');
        createPost();
        event.preventDefault();
    }
    
    const createPost = async () => {
        params.append("gearName", gearName)
        params.append("category", category)
        params.append("brand", brand)
        params.append("purchasedDay", purchasedDay)
        params.append("price", price)
        params.append("amount", amount)
        params.append("_token", csrf_token);
        
        const response = await axios.post(`/api/gears/create/${props.user_id}`, 
        params,
        {
          headers: {
            'content-type': 'multipart/form-data',
            }
        }
        );
        props.getCategory();
    }
    
    return (
        <MenuItem>
            <SimpleModal 
            nav={"ギアを登録する"} 
            body=
                {
                <form onSubmit={handleSubmit}>
                    <label>
                        image : <input type="file" onChange={handleImageChange} multiple /><br />
                        gearName : <input type="text" value={gearName} onChange={handleGearNameChange} /><br />
                        category : <input type="text" value={category} onChange={handleCategoryChange} /><br />
                        brand : <input type="text" value={brand} onChange={handleBrandChange} /><br />
                        purchasedDay : <input type="date" value={purchasedDay} onChange={handlePurchasedDayChange} /><br />
                        price : <input type="number" value={price} onChange={handlePriceChange} /><br />
                        amount : <input type="number" value={amount} onChange={handleAmountChange} /><br />
                    </label>
                    <input type="submit" value="保存" />
                    {bolbs.map((file) => (
                       <img src={file} style={{width: "200px", height: '200px', objectFit: 'contain', border: "1px solid black"}} key={file}/> 
                    ))}
                </form>
                }
            />
        </MenuItem>
    )
})

export default CreateGear;