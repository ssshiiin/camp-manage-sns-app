import React from 'react';
import Router from './router';
import RouterHeader from './RouterHeader';
import { SideBar } from './templates';

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
      <div className="sub-category"></div>
    </main>
  );
};

export default App;
