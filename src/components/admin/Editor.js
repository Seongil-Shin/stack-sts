import { storageService } from "fbase";
import { useMemo } from "react";
import ReactQuill from "react-quill";
import { getYYYYMMDD } from "utils/getYYYYMMDD";

const Toolbar = () => {
  return (
    <div id="toolbar">
      <select className="ql-header" defaultValue={""} onChange={(e) => e.persist()}>
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option></option>
      </select>
      <select className="ql-size" defaultValue={""} onChange={(e) => e.persist()}>
        <option value="small"></option>
        <option></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
      <select className="ql-align" defaultValue={""} onChange={(e) => e.persist()}>
        <option></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
    </div>
  );
};
export default function Editor({ value, onChange }) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const formats = [
    //'font',
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
  ];

  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const range = this.quill.getSelection(true);
        const result = storageService
          .ref()
          .child(`newConscase/${getYYYYMMDD(new Date())}-${file.name}`)
          .put(file);
        result.then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            this.quill.insertEmbed(range.index, "image", url, "user");
          });
        });
      };
      reader.readAsDataURL(file);
    };
  }

  return (
    <div>
      <Toolbar />
      <ReactQuill value={value} onChange={onChange} modules={modules} formats={formats} />
    </div>
  );
}
