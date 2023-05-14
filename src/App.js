import "./styles/style.css";
import React, { useState, useEffect } from 'react';
import SearchSystem from "./search";
import AddUser from "./createuser";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<SearchSystem />}></Route>
          <Route path="/adduser" element={<AddUser/>}></Route>
        
      </Routes>
    </BrowserRouter>
      </div>

  );
}

export default App;
