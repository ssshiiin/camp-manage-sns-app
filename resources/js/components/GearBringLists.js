import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from './Header';
import NestedList from './NestedList';
 
function GearBringLists(props){
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [templates, setTemplates] = useState([]);
    
    useEffect(() => {
        getGear();
        getCount();
        getTemplates();
    }, [])
    
    const getGear = async () => {
        const response = await axios.get(`/api/bring_gears/${props.match.params.id}`);
        setCategories(response.data.data);
    }
    
    const getCount = async () => {
        const response = await axios.get(`/api/count/true/bring/${props.match.params.id}`);
        setCount(response.data)
    }
    
    const postIs_check = async(is_check, id) => {
        const response = await axios.post(`/api/update/bring_gears/${id}`, 
        {
            is_check: is_check
        });
        setCategories(response.data.data);
        getCount();
    } 
    
    const deleteBringGear = async(id) => {
        const response = await axios.get(`/api/delete/bring_gears/${id}`);
        setCategories(response.data.data);
        getCount();
    }
    
    const createTemplates = async() => {
        const response = await axios.post(`/api/create/templates/${props.match.params.id}`
        , [categories, "テンプレート"]);
    }
    
    const useTemplates = async() => {
        const response = await axios.post(`/api/templates/use/${props.match.params.id}`
        , ["テンプレート"]);
        console.log(response.data.data);
        setCategories(response.data.data);
        getCount();
        
    }
    
    const getTemplates = async() => {
        const response = await axios.get(`/api/templates/${props.match.params.id}`);
        
        setTemplates(response.data);
    }
    
    return (
        <div className="gear">
            <Header 
            user_id={props.match.params.id} 
            createTemplates={createTemplates}
            useTemplates={useTemplates}
            getTemplates={getTemplates}
            templates={templates}
            />
            <div className="gear-main">
                <NestedList 
                categories={categories} 
                getCount={getCount} 
                getGear={getGear} 
                postIs_check={postIs_check} 
                deleteBringGear={deleteBringGear} 
                count={count}
                />
            </div>
        </div>
    )
}

export default GearBringLists;