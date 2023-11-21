import React, { useState } from "react";

const UploadImage = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    // console.log(e.target.files);
    setFileName(e.target.files[0].name);
    encodeFileToBase64(e.target.files[0]);
  };
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        console.log(reader.result);
        setFile(reader.result);
        resolve();
      };
    });
  };
  // console.log(fileName);
  // console.log(file);
  return (
    <div>
      <input
        id="input-file"
        type="file"
        onChange={(e) => handleChange(e)}
        style={{ display: "none" }}
      />
      <label htmlFor="input-file" style={{ cursor: "pointer" }}>
        choose file
      </label>
      <div>{fileName}</div>
      <img src={file} alt="" />
    </div>
  );
};

export default UploadImage;
