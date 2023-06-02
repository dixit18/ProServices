import React from "react";
import "./Featured.scss";

function Featured() {
 
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
           <span>Home services</span> , on demand.
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Search for Services' />
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Salon for Women </button>
            <button>Electicians </button>
            <button>Cleaning</button>
            <button>Plumbers</button>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default Featured;
