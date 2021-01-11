import React, { useRef } from "react";

function ConscaseList({ conscases, history }) {
   const pages = useRef(1);
   const onDocumentClick = (conscaseId) => {
      history.push({
         pathname: history.location.pathname + "/document",
         state: { conscaseId: conscaseId },
      });
   };

   const onSeeMoreClick = () => {
      pages.current += 1;
   };
   return (
      <>
         <h3>시공사례</h3>
         {conscases.slice(0, pages.current * 6).map((conscase, index) => {
            return (
               <div
                  key={index}
                  style={{ width: 300, height: 340 }}
                  onClick={() => onDocumentClick(conscase.id)}
               >
                  <img
                     src={conscase.thumbnail}
                     width="300"
                     height="300"
                     alt="error"
                  />
                  <br />
                  <span>{conscase.subject}</span>
               </div>
            );
         })}
         <button onClick={onSeeMoreClick}>더보기</button>
         <br />
      </>
   );
}
export default ConscaseList;
