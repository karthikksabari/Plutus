import axios from 'axios';

// Ensure this matches your backend port
const API_URL = 'http://localhost:8000';

export const analyzeDocument = async (file, onProgress) => {
  // 1. SAFETY CHECK: Ensure we are sending a real File
  if (!(file instanceof File)) {
    console.error("❌ CRTICAL ERROR: Payload is not a file!", file);
    throw new Error("Invalid file payload");
  }

  console.log("🚀 Sending File:", file.name, "Size:", file.size);

  const formData = new FormData();
  // 2. APPEND THE FILE
  // This matches the Python: file: UploadFile = File(...)
  formData.append('file', file); 

  try {
    // 3. SEND REQUEST - DO NOT ADD HEADERS MANUALLY!
    // Axios + Browser will automatically add the correct Content-Type with Boundary.
    const response = await axios.post(`${API_URL}/analyze`, formData, {
      // ❌ DELETED: headers: { 'Content-Type': 'multipart/form-data' } <-- THIS WAS THE BUG
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(percentCompleted);
      }
    });

    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const downloadForensicReport = (filename) => {
  window.open(`${API_URL}/export/${filename}`, '_blank');
};