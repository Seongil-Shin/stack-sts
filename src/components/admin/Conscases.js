import React, { useState } from "react";
import Navigation from "./Navigation";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { fireStoreService } from "fbase";

function Conscases() {
   const [Editing, setEditing] = useState(false);
   const [subject, setSubject] = useState("");
   const [check, setCheck] = useState(false);
   const [editorToHtml, setEditorToHTML] = useState(null);

   const onEditingClick = () => {
      setEditing((prev) => !prev);
   };
   const onChange = (event) => {
      const {
         target: { name, value },
      } = event;
      if (name === "subject") setSubject((prev) => value);
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
   const onSubmit = async (event) => {
      event.preventDefault();
      setEditorToHTML(
         draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
      const conscaseObj = {
         subject: subject,
         html: editorToHtml,
         createdAt: Date.now(),
      };
      await fireStoreService.collection("conscase").add(conscaseObj);
      setEditing((prev) => !prev);
   };
   const [editorState, setEditorState] = useState(EditorState.createEmpty());

   const onEditorStateChange = (editorState) => {
      setEditorState((prev) => editorState);
   };

   return (
      <>
         {Editing ? (
            <>
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
                  <input type="submit" value="제출" />
               </form>
               <button onClick={onEditingClick}>취소</button>
               <button onClick={onCheck}>확인</button>
               {check && (
                  <>
                     <div dangerouslySetInnerHTML={{ __html: editorToHtml }} />
                     <button onClick={onUnCheck}>확인 취소</button>
                  </>
               )}
            </>
         ) : (
            <>
               <Navigation />
               <div>시공사례입니다.</div>
               <button onClick={onEditingClick}>작성</button>
            </>
         )}
      </>
   );
}
export default Conscases;
