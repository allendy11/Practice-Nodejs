import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./CKEditorPage.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditorPage = () => {
  // ClassicEditor.create(document.querySelector("#editor"))
  //   .then((editor) => {
  //     console.log("Editor was initialized");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  return (
    <div id="CKEditor" className="page">
      <div className="container">
        <div className="box">
          <h2>Using CKEditor 5 build in React</h2>
        </div>

        <div className="editor-box">
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CKEditorPage;
class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    xhr.open("POST", "http://localhost:8000/api/image/upload", true);
    xhr.responseType = "json";
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "파일을 업로드 할 수 없습니다.";

    xhr.addEventListener("error", () => {
      reject(genericErrorText);
    });
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      resolve({
        default: response.url, //업로드된 파일 주소
      });
    });
  }

  _sendRequest(file) {
    const data = new FormData();
    data.append("upload", file);
    this.xhr.send(data);
  }
}
function makeEditor(target) {
  return ClassicEditor.create(document.querySelector(target), {
    extraPlugins: [MyCustomUploadAdapterPlugin],
  });
}
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}
