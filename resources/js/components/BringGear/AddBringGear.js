import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import IndexNestedList from '../ReactUI/IndexNestedList';
 
function AddBringGear(props){
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        getAddGear();
        getCount();
    }, [])
    
    const getAddGear = async () => {
        const response = await axios.get(`/api/add/gears/${props.user_id}`);
        setCategories(response.data.data);
    }
    
    const getCount = async () => {
        const response = await axios.get(`/api/count/true/add/${props.user_id}`);
        setCount(response.data)
    }
    
    const postIs_check = async(is_check, id) => {
        const response = await axios.post(`/api/update/gears/${id}`, 
        {
            is_check: is_check
        });
        setCategories(response.data.data);
        getCount();
    } 
    
    const createAddBringGear = async() => {
        const response = await axios.post(`/api/create/bring_gears/${props.user_id}`);
        setCategories(response.data.data);
        getCount();
    } 
    
    return (
        <div className="gear">
            <Header 
            user_id={props.user_id}
            postAddBringGear={createAddBringGear} 
            />
            <div className="gear-main">
                <IndexNestedList 
                categories={categories} 
                getAddGear={getAddGear} 
                postIs_check={postIs_check} 
                count={count}/>
            </div>
        </div>
    )
}

export default AddBringGear;