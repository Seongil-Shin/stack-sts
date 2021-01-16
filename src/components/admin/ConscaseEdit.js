import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "css/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { fireStoreService } from "fbase";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   subject: {
      width: "60%",
   },
   checkContainer: {
      width: "100%",
   },
   checkContent: {
      minHeight: 300,
   },
}));

function ConscaseEdit() {
   const styles = useStyles();
   const [subject, setSubject] = useState("");
   const [check, setCheck] = useState(false);
   const [editorToHtml, setEditorToHTML] = useState({});
   const [editorState, setEditorState] = useState(EditorState.createEmpty());
   const [thumbnail, setThumbnail] = useState("");
   const history = useHistory();
   const location = useLocation();
   useEffect(() => {
      if (location.state) {
         setSubject(location.state.conscase.subject);
         setThumbnail(location.state.conscase.thumbnail);
         const { contentBlocks, entityMap } = htmlToDraft(
            location.state.conscase.html
         );
         const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
         );
         const editorState = EditorState.createWithContent(contentState);
         setEditorState(editorState);
      }
   }, [location]);

   const onSubmit = async (event) => {
      event.preventDefault();
      const conscaseObj = {
         subject: subject,
         html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
         createdAt: Date.now(),
         thumbnail: thumbnail,
      };
      if (location.state) {
         await fireStoreService
            .collection("conscase")
            .doc(location.state.id)
            .set(conscaseObj);
      } else {
         await fireStoreService.collection("conscase").add(conscaseObj);
      }
      history.push("/admin/conscase");
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
            <TextField
               id="subject"
               value={subject}
               name="subject"
               onChange={onChange}
               label="제목"
               maxLength={120}
               className={styles.subject}
               required
            />
            <br />
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
            <br />
            <TextField
               id="subject"
               value={thumbnail}
               name="thumbnail"
               onChange={onChange}
               label="썸네일"
               maxLength={120}
               required
            />
            <br />
            <br />
            <Button type="submit" color="primary" variant="outlined">
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시공사례
               등록&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
         </form>
         <br />
         <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => history.push("/admin/conscase")}
         >
            등록 취소
         </Button>
         &nbsp;&nbsp;
         <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={onCheck}
         >
            미리보기
         </Button>
         <br />
         <br />
         {check && (
            <Box
               className={styles.checkContainer}
               border={1}
               borderRadius={13}
               borderColor="grey.500"
            >
               <Box className={styles.checkContent}>
                  <div dangerouslySetInnerHTML={{ __html: editorToHtml }} />
               </Box>
               <Button color="primary" variant="outlined" onClick={onUnCheck}>
                  확인 취소
               </Button>
            </Box>
         )}
      </div>
   );
}
export default ConscaseEdit;
