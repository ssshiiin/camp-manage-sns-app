import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import IndexNestedList from '../ReactUI/IndexNestedList';
 
function SaveGear(props){
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        getGear();
        getCount();
    }, [])
    
    const getGear = async () => {
        const response = await axios.get(`/api/save_gears/${props.match.params.id}`);
        setCategories(response.data.data);
    }
    
    const getCount = async () => {
        const response = await axios.get(`/api/count/true/${props.match.params.id}`);
        setCount(response.data)
    }
    
    const postIs_check = async(is_check, id) => {
        const response = await axios.post(`/api/update/save_gears/${id}`, 
        {
            is_check: is_check
        });
        setCategories(response.data.data);
        getCount();
    } 
    
    return (
        <div className="gear">
            <Header user_id={props.match.params.id}/>
            <div className="gear-main">
                <IndexNestedList categories={categories} getCount={getCount} getGear={getGear} postIs_check={postIs_check} count={count}/>
            </div>
        </div>
    )
}

export default SaveGear;