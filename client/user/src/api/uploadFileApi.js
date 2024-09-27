import axios from 'axios';

const uploadFileApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

export const uploadApi = async (file) => {
    try {
        const res = await uploadFileApi.post('/api/upload', file);
        return res.data;
    } catch (error) {
        throw new Error('Upload failed');
    }
};

export const downloadApi = async (path) => {
    try {
        const response = await uploadFileApi.get(`/images/${path}`, {
            responseType: 'blob', // Chỉ định responseType là 'blob' để nhận dữ liệu dưới dạng blob
        });

        return response.data; 
    } catch (error) {
        throw new Error('Download failed');
    }
};