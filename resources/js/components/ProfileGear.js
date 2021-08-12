import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfileGear(props){
    const [gears, setGears] = useState([]);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        getGear();
        getCategory();
    }, [])
    
    const getGear = async () => {
        const response = await axios.get(`/api/gears/${props.match.params.id}`);
        setGears(response.data.data);
    }
    
    const getCategory = async () => {
        const response = await axios.get(`/api/gears/category/${props.match.params.id}`);
        setCategories(response.data.data);
        console.log(response.data)
    }
    
    console.log(categories)
    
    return (
        <ul>
            {categories.map((category) => 
                <li key={category.category}>
                    {category.category}
                </li>    
            )}  
        </ul>
    )
}

export default ProfileGear;