import React from 'react';
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination';

import SimpleMenu from './SimpleMenu';

function GearNav(props){
    return (
        <div className="profile-main-gear-nav">
            <ul>
                <li className="categories"></li>
                {props.eventList.map((category) => 
                    <li className="categories" key={category.category}>
                        <SimpleMenu category={category.category} gearsList={category.gears} />
                    </li>    
                )}  
                <li className="categories"></li>
            </ul>
            <Pagination
              activePage={props.activePage}
              itemsCountPerPage={6}
              totalItemsCount={props.totalItemsCount}
              onChange={props.getCategory}
              linkClass='paginate-number'
              linkClassPrev='paginate-prev'
              linkClassNext='paginate-next'
              hideFirstLastPages={true}
            />
        </div>
    )
}

export default GearNav;