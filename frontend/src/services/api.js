import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const startConversion = async (fileId, targetFormat) => {
  const response = await api.post('/convert', {
    file_id: fileId,
    target_format: targetFormat,
  });
  return response.data;
};

export const checkStatus = async (conversionId) => {
  const response = await api.get(`/status/${conversionId}`);
  return response.data;
};

export default api;
