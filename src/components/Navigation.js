import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav>
        <span>
          <Link to="/">홈</Link>
        </span>
        &nbsp;
        <span>
          <Link to="Greeting">인삿말</Link>
        </span>
        &nbsp;
        <span>
          <Link to="ConsCase">시공사례</Link>
        </span>
        &nbsp;
        <span>
          <Link to="QnA">문의</Link>
        </span>
      </nav>
    </>
  );
}
export default Navigation;
