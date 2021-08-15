import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import GearNav from './GearNav';
import GearTimeLine from './GearTimeLine';

function ProfileGear(props){
    const [eventList, setEventList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    
    useEffect(() => {
        getCategory();
    }, [])
    
    const getCategory = async (page) => {
        const response = await axios.get(`/api/categories/${props.match.params.id}?page=${page}`);
        
        setEventList(response.data.data);
        setActivePage(response.data.meta.current_page);
        setItemsCountPerPage(response.data.meta.per_page);
        setTotalItemsCount(response.data.meta.total);
    }
    
    return (
        <div className="profile-main-gear">
            <GearNav 
            getCategory={getCategory} 
            eventList={eventList} 
            activePage={activePage} 
            totalItemsCount={totalItemsCount}
            />
            <div className="profile-main-gear-category">
                {eventList.map((category) =>
                <GearTimeLine id={props.match.params.id} category={category.category} key={category.category}/>
                )}
            </div>
        </div>
    )
}

export default ProfileGear;