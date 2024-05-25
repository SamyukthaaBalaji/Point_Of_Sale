import React from "react";
import "./home.css";
import bg from "../../asset/bg.mp4";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero">
      <video
        src={bg}
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <nav>
        <ul>
          <li>
          <Link to="/dashboard">dashboard</Link>
          </li>
          <li>
          <Link to="/login">LogIn</Link>
          </li>
          <li>
            <a href="#">Orders</a>
          </li>
          <li>
            <a href="#">Payments</a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h1>SwiftSell</h1>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
};

export default Home;
