import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import IndexNestedList from '../ReactUI/IndexNestedList';
 
function BringGear(props){
    const [categories, setCategories] = useState([]);
    const [count, setCount] = useState(0);
    const [templates, setTemplates] = useState([]);
    
    useEffect(() => {
        getGear();
        getCountBring();
        getTemplates();
    }, [])
    
    const getGear = async () => {
        const response = await axios.get(`/api/bring_gears/${props.user_id}`);
        setCategories(response.data.data);
    }
    
    const getCountBring = async () => {
        const response = await axios.get(`/api/count/true/bring/${props.user_id}`);
        setCount(response.data)
    }
    
    const postIs_check = async(is_check, id) => {
        const response = await axios.post(`/api/update/bring_gears/${id}`, 
        {
            is_check: is_check
        });
        setCategories(response.data.data);
        getCountBring();
    } 
    
    const deleteBringGear = async(id) => {
        const response = await axios.post(`/api/delete/bring_gears/${id}`);
        setCategories(response.data.data);
        getCountBring();
    }
    
    const allDeleteBringGear = async() => {
        const response = await axios.post(`/api/all/delete/bring_gears/${props.user_id}`);
        setCategories(response.data.data);
        getCountBring();
    }
    
    const createTemplates = async(template_name) => {
        const response = await axios.post(`/api/create/templates/${props.user_id}`
        , [categories, template_name]);
        getTemplates();
    }
    
    const useTemplates = async(useTemplate_name) => {
        const response = await axios.post(`/api/templates/use/${props.user_id}`
        , [useTemplate_name]);
        setCategories(response.data.data);
        getTemplates();
    }
    
    const deleteTemplate = async(deleteTemplate_name) => {
        const response = await axios.post(`/api/templates/delete/${props.user_id}`
        , [deleteTemplate_name]);
        
        getTemplates();
        getGear();
        getCountBring();
    }
    
    const getTemplates = async() => {
        const response = await axios.get(`/api/templates/${props.user_id}`);
        
        setTemplates(response.data);
        getCountBring();
    }
    
    return (
        <div className="gear">
            <Header 
            user_id={props.user_id} 
            allDeleteBringGear={allDeleteBringGear}
            createTemplates={createTemplates}
            useTemplates={useTemplates}
            getTemplates={getTemplates}
            deleteTemplate={deleteTemplate}
            templates={templates}
            />
            <div className="gear-main">
                <IndexNestedList 
                categories={categories} 
                getCount={getCountBring} 
                getGear={getGear} 
                postIs_check={postIs_check} 
                deleteBringGear={deleteBringGear} 
                count={count}
                />
            </div>
        </div>
    )
}

export default BringGear;