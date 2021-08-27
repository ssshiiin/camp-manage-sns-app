import React from "react";
import Router from "./router";
import { SideBar } from "./templates";

const App = () => {
  return (
    <main>
      <SideBar />
      <Router />
    </main>
  )
}

export default App;