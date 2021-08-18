import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from './Header';
import NestedList from './NestedList';
 
function GearBringAdd(props){
    console.log(props)
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        getAddGear();
        getCount();
    }, [])
    
    const getAddGear = async () => {
        const response = await axios.get(`/api/add/gears/${props.match.params.id}`);
        setCategories(response.data.data);
    }
    
    const getCount = async () => {
        const response = await axios.get(`/api/count/true/add/${props.match.params.id}`);
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
    
    const postAddBringGear = async() => {
        const response = await axios.get(`/api/create/bring_gears/${props.match.params.id}`);
        setCategories(response.data.data);
        getCount();
    } 
    
    return (
        <div className="gear">
            <Header 
            user_id={props.match.params.id}
            postAddBringGear={postAddBringGear} 
            />
            <div className="gear-main">
                <NestedList 
                categories={categories} 
                getAddGear={getAddGear} 
                postIs_check={postIs_check} 
                count={count}/>
            </div>
        </div>
    )
}

export default GearBringAdd;