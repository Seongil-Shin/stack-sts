import React from "react";
import { Link } from "react-router-dom";

const Navigation = React.memo(function Navigation() {
  const logoURL = process.env.REACT_APP_FULL_LOGO_PATH;
  return (
    <>
      <nav>
        <div>
          <Link to="/">
            <img src={logoURL} width="200" height="50" alt="error" />
          </Link>
        </div>
        <span>
          <Link to="/">홈</Link>
        </span>
        &nbsp;
        <span>
          <Link to="/greeting">인삿말</Link>
        </span>
        &nbsp;
        <span>
          <Link to="/conscase">시공사례</Link>
        </span>
        &nbsp;
        <span>
          <Link to="/qna">문의</Link>
        </span>
      </nav>
    </>
  );
});
export default React.memo(Navigation);
