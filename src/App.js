import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import React from "react";
import { Route, Routes } from "react-router-dom";
import Form from "./modules/form/form";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
