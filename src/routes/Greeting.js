import React from "react";

function Greeting() {
  const profilePhoto = process.env.REACT_APP_PROFILE_PHOTO_PATH;
  return (
    <>
      <h2>인삿말</h2>
      <hr />
      <br />
      <h3>Stack Trust&amp;Sincerity, 신뢰와 진심을 쌓겠습니다.</h3>
      <span>
        <img
          src={profilePhoto}
          width="360"
          height="450"
          alt="error"
          align="left"
        />
      </span>
      <span>
        조적STS를 방문해주신 모든 여러분, 감사합니다.
        <br></br>
        조적STS라는 이름을 갖기 훨씬 이전인 30년 전부터,
        <br />
        저희는 항상 기술력과 경험을 쌓아가며, 대한민국 조적 산업의 한 축을
        담당했습니다.
        <br />
        이제 저희는 조적STS라는 이름과 함께, 새로운 정신으로 더욱 발전된
        기술력으로 고객님의 일을 완수하겠습니다.
        <br />
        고객 여러분의 사랑과 성원에 항상 감사드립니다. 조적STS 대표 신태식
      </span>
    </>
  );
}
export default Greeting;
