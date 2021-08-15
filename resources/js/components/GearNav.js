import React from 'react';
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination';

function GearNav(props){
    return (
        <div className="profile-main-gear-nav">
            <ul>
                <li className="categories"></li>
                {props.eventList.map((category) => 
                    <li className="categories" key={category.category}>
                        {category.category}
                        <ul className="categories-submenu">
                            {category.gears.map((gear)=>
                                <Link to={`/${gear.user_id}/gear/${gear.id}`} key={gear.id}>
                                    <li key={gear.id}>
                                        {gear.gear_name}
                                    </li>
                                </Link>
                            )}
                        </ul>
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