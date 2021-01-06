import React from "react";

const Footer = React.memo(function Footer() {
  return (
    <div className="footer">
      <div>
        조적STS | 대표 신태식 | 문의 : 상단 게시판 혹은 sts8448@naver.com
      </div>
      <div>사업자 등록번호 : 742-70-00261</div>
      <div>&copy; {new Date().getFullYear()} 조적STS</div>
    </div>
  );
});
export default React.memo(Footer);
