import { useState } from "react";
import "./App.css";
import CryptoJS from "crypto-js";

const SECRET_PASS = "XkhZG4fW2t2W";

const App = () => {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");

  const [errorMessage, setErrorMessage] = useState("");

  // Store encrypted data
  const [encryptedData, setEncryptedData] = useState("");

  // Store decrypted data
  const [decryptedData, setDecryptedData] = useState("");

  // Switch between encrypt and decrypt screens
  const switchScreen = (type) => {
    setScreen(type);
    // Clear all data and error message when switching screens
    setText("");
    setEncryptedData("");
    setDecryptedData("");
    setErrorMessage("");
  };

  // Encrypt user input text
  const encryptData = () => {
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        SECRET_PASS
      ).toString();
      setEncryptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Encryption failed. Please check your input");
    }
  };

  // Decrypt user input text
  const decryptData = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecryptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption failed. Please check your input.");
    }
  };

  const handleClick = () => {
    if (!text) {
      setErrorMessage("Please enter some text.");
      return;
    }

    if (screen === "encrypt") {
      encryptData();
    } else {
      decryptData();
    }
  };

  return (
    <div className="container">
      <div>
        {/* Buttons to switch between Encrypt and Decrypt screens */}
        <button
          className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
          onClick={() => {
            switchScreen("encrypt");
          }}
        >
          Encrypt
        </button>

        <button
          className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
          onClick={() => {
            switchScreen("decrypt");
          }}
        >
          Decrypt
        </button>
      </div>

      <div className="card">
        {/* Textarea for user input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            screen === "encrypt" ? "Enter Your Text" : "Enter Encrypted Data"
          }
        />

        {/* Display error message if there's an error */}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {/* Encrypt or Decrypt button */}
        <button
          className={`btn submit-btn ${
            screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
          }`}
          onClick={handleClick}
        >
          {screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      {/* Display encrypted or decrypted data if available */}
      {encryptedData || decryptedData ? (
        <div className="content">
          <label>{screen === "encrypt" ? "ENCRYPTED" : "DECRYPTED"} DATA</label>
          <p>{screen === "encrypt" ? encryptedData : decryptedData}</p>
        </div>
      ) : null}
    </div>
  );
};

export default App;
