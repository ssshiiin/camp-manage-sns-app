import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from './router';
import RouterHeader from './RouterHeader';
import { SideBar, SubCategory } from './templates';

const App = () => {
  return (
    <main>
      <SideBar />
      <header>
        <RouterHeader />
      </header>
      <div className="main-category">
        <Router />
      </div>
      <SubCategory />
    </main>
  );
};

export default App;
