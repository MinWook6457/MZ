import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");

  const createImg = async () => {
    try {
      const response = await axios.post("/create", {
        prompt,
      });
      setImageURL(response.data.url);
    } catch (error) {
      console.error("Error creating image:", error);
    }
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="form">
        <h1>당신의 예술 작품을 만드세요!</h1>
        {imageURL && <img src={imageURL} alt="prompt" />}
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="이미지 설명을 입력하세요"
          />
          <button type="submit" className="btn btn-primary" onClick={createImg}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
