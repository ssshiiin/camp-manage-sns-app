import React from "react";
import Router from "./router";
import HeaderRouter from "./HeaderRouter";
import { SideBar } from "./templates";

const App = () => {
  return (
    <main>
      <SideBar />
      <header>
        <HeaderRouter />
      </header>
      <div className="main-category">
        <Router />
      </div>
      <div className="sub-category">

      </div>
    </main>
  )
}

export default App;