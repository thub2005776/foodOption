import axios from 'axios';

const foodApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

// Topic api
export const getTopic = async () => {
    const res = await foodApi.get('/api/topic');
    return res.data;
}

export const getTopicById = async (id) => {
    const res = await foodApi.get(`/api/topic/${id}`);
    return res.data;
}

// foodGrou api
export const getFoodGroup = async () => {
    const res = await foodApi.get('/api/foodgroup');
    return res.data;
}

export const addFoodGroup = async (foodgroup) => {
    const res = await foodApi.post('/api/foodgroup', foodgroup);
    return res.data;
}

export const updateFoodGroup = async (foodGroup) => {
    const res = await foodApi.post(`/api/foodgroup/${foodGroup._id}`, foodGroup);
    return res.data;
}

export const deleteFoodGroupItem = async (fid) => {
    const res = await foodApi.delete(`/api/foodgroup/${fid}`);
    return res.data;
}

export const deleteAllFoodGroup = async () => {
    const res = await foodApi.delete(`/api/foodgroup`);
    return res.data;
}

// food api
export const getFoodApi = async () => {
    const res = await foodApi.get('/api/food');
    return res.data;
}

export const getFoodByTopicIdApi = async (topicId) => {
    const res = await foodApi.get(`/api/food/tid/${topicId}`);
    return res.data;
}

export const getFoodByIdApi = async (Id) => {
    const res = await foodApi.get(`/api/food/${Id}`);
    return res.data;
}

export const addFoodApi = async (food) => {
    const res = await foodApi.post('/api/food', food);
    return res.data;
}

export const updateFoodApi = async (Food) => {
    const res = await foodApi.post(`/api/food/${Food.id}`, Food);
    return res.data;
}

export const updateStoredFoodApi = async (Food) => {
    const res = await foodApi.post(`/api/food/stored/${Food.id}`, Food);
    return res.data;
}