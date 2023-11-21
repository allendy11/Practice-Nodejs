import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import CKEditorPage from "./pages/ckEditor/CKEditorPage";
import PerspectivePage from "./pages/perspective/PerspectivePage";
import S3bucket from "./pages/s3bucket/S3bucket";
import UploadImage from "./pages/uploadImage/UploadImage";

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/ck" element={<CKEditorPage />} />
        <Route path="/perspective" element={<PerspectivePage />} />
        <Route path="/s3" element={<S3bucket />} />
        <Route path="/img" element={<UploadImage />} />
      </Routes>
    </div>
  );
}

export default App;
