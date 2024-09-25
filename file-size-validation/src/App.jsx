import React, { useState } from "react";
import "./App.css";

const App = () => {
  // State variables to manage the selected file, error message and success status
  const [selectedFile, setSelectedFile] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Event handler to update the selected file
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Function to handle the selected file
  const validateSelectedFile = () => {
    // Define min and max file size limits(in kilobytes)
    const MIN_FILE_SIZE = 1024; //1MB
    const MAX_FILE_SIZE = 5120; //5MB

    // Check if a file has been selected
    if (!selectedFile) {
      setErrorMsg("Please choose a file");
      setIsSuccess(false);
      return;
    }

    // Calculate the selected file's size in kilobytes
    const fileSizeKiloBytes = selectedFile.size / 1024;

    // Check if the file size is below the minimum limit
    if (fileSizeKiloBytes < MIN_FILE_SIZE) {
      setErrorMsg("File size if less than minimum limit");
      setIsSuccess(false);
      return;
    }

    // Check if the file size is above the maximum limit
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMsg("File size is greater than maximum limit");
      setIsSuccess(false);
      return;
    }

    // Reset error message and set success status when validation is successful
    setErrorMsg("")
    setIsSuccess(true) 
  };

  return (
    <div className="App-container">
      <div className="card">
        <div className="card-header">
          <h4 className="title">File Size Validation</h4>
        </div>

        <div className="card-body">
          <p className="label">Choose File</p>

          {/* Input field for choosing a file */}
          <input type="file" name="file" onChange={handleFileChange} />

          <div className="space-between">
            <p className="info-message">Min size: 1MB</p>
            <p className="info-message">Max size: 5MB</p>
          </div>

          {/* Display success message if validation is successful */}
          {isSuccess ? (
            <p className="success-message">Validation successful</p>
          ) : null}

          {/* Display error message if there is an error */}
          <p className="error-message">{errorMsg}</p>

          {/* Button to trigger file size validation */}
          <button className="btn" onClick={validateSelectedFile}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
