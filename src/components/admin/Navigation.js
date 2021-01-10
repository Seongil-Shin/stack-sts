import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin">관리자 홈</Link>
        </li>
        <li>
          <Link to="/admin/conscase">시공사례 확인</Link>
        </li>
        <li>
          <Link to="/admin/questions">문의 확인</Link>
        </li>
      </ul>
    </div>
  );
}
export default Navigation;
