import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App(){
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector)
  return (
    <div>
      App
    </div>
  )
}

export default App;