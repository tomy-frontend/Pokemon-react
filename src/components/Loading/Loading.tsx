import React from "react";
import "./Loading.css";

/**
 * Loading component to display during data fetching
 */
export const Loading: React.FC = () => {
  return (
    <div className="loading">
      <h2>ロード中・・・</h2>
      <div className="spinner"></div>
    </div>
  );
};
