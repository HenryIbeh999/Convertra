import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Sends a file and a target format to the backend for conversion.
 * Returns the download URL for the converted file.
 */
export const convertFile = async (file, targetFormat) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('target_format', targetFormat);

  const response = await api.post('/convert', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // { "message": "success", "download_url": "/api/download/..." }
};

export default api;
