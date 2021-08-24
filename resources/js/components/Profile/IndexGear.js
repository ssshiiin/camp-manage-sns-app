import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function IndexGear(props){
    const [gearList, setGearList] = useState([]);
    const [activeGearPage, setActiveGearPage] = useState(1);
    const [gearsCountPerPage, setGearsCountPerPage] = useState(0);
    const [totalGearsCount, setTotalGearsCount] = useState(0);
    
    useEffect(() => {
        getGear();
    }, [])
    
    const getGear = async (page) => {
        const response = await axios.get(`/api/gears/${props.id}?page=${page}&category=${props.category}`);
        
        setGearList(response.data.data)
        setActiveGearPage(response.data.meta.current_page);
        setGearsCountPerPage(response.data.meta.per_page);
        setTotalGearsCount(response.data.meta.total);
    }
    
    return (
        <ul className="profile-main-gear-category-timeline" key={props.category}>
            <h2 className="profile-main-gear-category-timeline-header">
            {props.category}
            </h2>
            <div className="profile-main-gear-category-timeline-gear-timeline">
                <li className="profile-main-gear-category-timeline-gear-timeline-paginate-prev"></li>
                {gearList.map((gear) => 
                <Link to={`/${props.id}/gear/${gear.id}`} key={gear.id}>
                    <li className="profile-main-gear-category-timeline-gear-timeline-index"> 
                        {gear.gear_name}
                        <div className="profile-main-gear-category-timeline-gear-timeline-index-image"></div>
                    </li>
                </Link>
                )}
                <li className="profile-main-gear-category-timeline-gear-timeline-paginate-next"></li>
            </div>
            <Pagination
              activePage={activeGearPage}
              itemsCountPerPage={4}
              totalItemsCount={totalGearsCount}
              onChange={getGear}
              linkClass='paginate-number'
              linkClassPrev='paginate-prev'
              linkClassNext='paginate-next'
              hideFirstLastPages={true}
            />
        </ul>
    )
}

export default IndexGear;