import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import NavGear from './NavGear';
import IndexGear from './IndexGear';

function UserGears(props){
    return (
        <div className="profile-main-gear">
            <NavGear
            getCategory={props.getCategory} 
            categories={props.categories} 
            activePage={props.activePage} 
            totalItemsCount={props.totalItemsCount}
            />
            <div className="profile-main-gear-category">
                {props.categories.map((category) =>
                <IndexGear 
                id={props.user_id} 
                category={category.category} 
                key={category.category}
                getCategory={props.getCategory}
                />
                )}
            </div>
        </div>
    )
}

export default UserGears;