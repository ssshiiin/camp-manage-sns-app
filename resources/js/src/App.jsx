import React from "react";
import Router from "./router";
import HeaderRouter from "./HeaderRouter";
import { SideBar } from "./templates";

const App = () => {
  return (
    <main>
      <SideBar />
      <HeaderRouter />
      <div className="main-category">
        <Router />
      </div>
    </main>
  )
}

export default App;