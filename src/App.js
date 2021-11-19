// import logo from './logo.svg';
import './App.css';
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
