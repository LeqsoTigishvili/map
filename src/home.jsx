import React from "react";
import "./styles/home.css";
import { Link, useNavigate  } from "react-router-dom";


const Home = () => {
    setTimeout(function() {
        window.location.replace('/search');
      }, 5000);
  return (
    <>
    <div class="loader" >
  <div class="load-text">
    <div class="loaded-text">F</div>
    <div class="loading-text">lower, Delivery</div>
  </div>
</div>

</>
  );
};

export default Home;
