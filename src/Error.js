import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <article>
      <div>
        <h4>Error Page</h4>
        <div>
          <Link to="/">Back Home</Link>
        </div>
      </div>
    </article>
  );
};

export default Error;
