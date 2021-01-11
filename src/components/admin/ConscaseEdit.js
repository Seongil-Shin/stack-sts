import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { fireStoreService } from "fbase";
import styled from "styled-components";

const IntroduceContent = styled.div`
   position: relative;
   border: 0.0625rem solid #d7e2eb;
   border-radius: 0.75rem;
   overflow: hidden;
   padding: 1.5rem;
   width: 50%;
   margin: 0 auto;
   margin-bottom: 4rem;
`;

function ConscaseEdit({ onEditingClick }) {
   const [subject, setSubject] = useState("");
   const [check, setCheck] = useState(false);
   const [editorToHtml, setEditorToHTML] = useState(null);
   const [editorState, setEditorState] = useState(EditorState.createEmpty());
   const [thumbnail, setThumbnail] = useState("");

   const onSubmit = async (event) => {
      event.preventDefault();
      setEditorToHTML(
         draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
      const conscaseObj = {
         subject: subject,
         html: editorToHtml,
         createdAt: Date.now(),
         thumbnail: thumbnail,
      };
      await fireStoreService.collection("conscase").add(conscaseObj);
      onEditingClick();
   };
   const onChange = (event) => {
      const {
         target: { name, value },
      } = event;
      if (name === "subject") setSubject((prev) => value);
      else if (name === "thumbnail") setThumbnail((prev) => value);
   };
   const onCheck = () => {
      setEditorToHTML(
         draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
      setCheck(true);
      console.log(editorToHtml);
   };
   const onUnCheck = () => {
      setCheck(false);
   };

   const onEditorStateChange = (editorState) => {
      setEditorState((prev) => editorState);
   };
   return (
      <div>
         <form onSubmit={onSubmit}>
            <span>제목 : </span>
            <input
               type="text"
               name="subject"
               value={subject}
               onChange={onChange}
            />
            <Editor
               wrapperClassName="wrapper-class"
               editorClassName="editor"
               toolbarClassName="toolbar-class"
               toolbar={{
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: false },
               }}
               placeholder="내용을 작성해주세요."
               localization={{
                  locale: "ko",
               }}
               editorState={editorState}
               onEditorStateChange={onEditorStateChange}
            />
            <span>썸네일 : </span>
            <input
               type="text"
               name="thumbnail"
               value={thumbnail}
               onChange={onChange}
            />
            <br />
            <input type="submit" value="제출" />
         </form>
         <button onClick={onEditingClick}>취소</button>
         <button onClick={onCheck}>확인</button>
         {check && (
            <>
               <IntroduceContent
                  dangerouslySetInnerHTML={{ __html: editorToHtml }}
               />
               <button onClick={onUnCheck}>확인 취소</button>
            </>
         )}
      </div>
   );
}
export default ConscaseEdit;
