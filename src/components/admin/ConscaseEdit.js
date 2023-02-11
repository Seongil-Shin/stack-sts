import React, { useEffect, useState } from "react";
import { fireStoreService } from "fbase";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { getYYYYMMDD } from "utils/getYYYYMMDD";
import Editor from "./Editor";

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
  const [thumbnail, setThumbnail] = useState("");
  const history = useHistory();
  const location = useLocation();

  const [value, setValue] = useState("");

  //수정모드일시 location.state에 들어있는 conscase를 뽑아 edit창을 초기화시킴
  useEffect(() => {
    if (location.state) {
      setSubject(location.state.conscase.subject);
      setThumbnail(location.state.conscase.thumbnail);
      setValue(location.state.conscase.html);
    }
  }, [location]);

  //수정모드일땐 set을, 작성모드일땐 add를 적용함.
  const onSubmit = async (e) => {
    e.preventDefault();

    const conscaseObj = {
      subject: subject,
      html: value,
      createdAt: Date.now(),
      thumbnail: thumbnail,
    };
    if (location.state) {
      await fireStoreService.collection("conscase").doc(location.state.id).set(conscaseObj);
    } else {
      await fireStoreService
        .collection("conscase")
        .doc(`${getYYYYMMDD(new Date())}-${conscaseObj.subject}`)
        .set(conscaseObj);
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
    setEditorToHTML(value);
    setCheck(true);
  };
  const onUnCheck = () => {
    setCheck(false);
  };

  console.log(editorToHtml);

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
        <br />
        <Editor value={value} onChange={setValue} />
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시공사례 등록&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Button>
      </form>
      <br />
      <Button size="small" color="primary" variant="outlined" onClick={() => history.push("/admin/conscase")}>
        등록 취소
      </Button>
      &nbsp;&nbsp;
      <Button size="small" color="primary" variant="outlined" onClick={onCheck}>
        미리보기
      </Button>
      <br />
      <br />
      {check && (
        <Box className={styles.checkContainer} border={1} borderRadius={13} borderColor="grey.500">
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
