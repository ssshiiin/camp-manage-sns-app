import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowGear(props){
    const [gear, setGear] = useState([]);
    
    useEffect(() => {
        getGear();
    }, [])
    
    const getGear = async () => {
        const response = await axios.get(`/api/gear/${props.match.params.gear_id}`);
        setGear(response.data);
        console.log(response.data);
    }
    
    return (
        <div className="profile-main-post-index">
            <ul>
                <li>{gear.gear_name}</li>
                <li>{gear.brand}</li>
                <li>{gear.category}</li>
                <li>{gear.price}</li>
                <li>{gear.purchased_day}</li>
                <li>{gear.amount}</li>
            </ul>
        </div>
    )
}

export default ShowGear;