import React, { useState, useEffect } from "react";
import { encryptMessage, decryptMessage,generateSHA256Hash } from "./utils/GenerateHash";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", image);
    fd.append("imagename", image.name);
    fd.append("firstname", firstName);
    fd.append("mobilenumber", mobileNumber);

    const { file, ...data } = Object.fromEntries(fd);

    const secretKey = "b60dd90d339b7aa86bcaa468c1806fce";

    const hash = generateSHA256Hash(data,secretKey);
    fd.append("hash",hash);

    const serverUrl = "http://localhost:4000"; // Replace with your server URL
    axios
      .post(serverUrl, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>Input Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
