import React from "react";
import { Link } from "react-router-dom";
import scss from "../styles/notFound.module.scss";

const NotFound = () => {
  return (
    <div className={scss["not-found"]}>
      <h1>
        {"<"}404 {"/>"} Oops...
      </h1>
      <p>The page you are trying to open doesn't exist</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
