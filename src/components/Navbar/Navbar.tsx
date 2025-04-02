import React from "react";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="pokeball-icon"></div>
      <span className="nav-title">ポケモン図鑑</span>
      <div className="pokeball-icon"></div>
    </nav>
  );
};
