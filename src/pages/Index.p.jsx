import React from "react";
import { Link } from "react-router-dom";
import "../css/indexPage.css";

const Index = () => {
  return (
    <div className="mainContainer">
      <div className="thingsContainer">
        <h2>WordFind</h2>
        <Link to="/create">
          <button className="createButton">
            <p className="LinkText">Nueva Partida</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
