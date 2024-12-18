import axios from 'axios';

const foodApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

// Topic api
export const getTopic = async () => {
    const res = await foodApi.get('/api/topic');
    return res.data;
}

export const getTopicSum = async () => {
    const res = await foodApi.get('/api/topic/sum');
    return res.data;
}

export const getTopicById = async (id) => {
    const res = await foodApi.get(`/api/topic/${id}`);
    return res.data;
}

export const addTopicApi = async (topic) => {
    const res = await foodApi.post('/api/topic', topic);
    return res.data;
}

export const updateTopicApi = async (topic) => {
    const res = await foodApi.post(`/api/topic/${topic._id}`, topic);
    return res.data;
}

export const topicStataticsApi = async (id) => {
    const res = await foodApi.get(`/api/topic/sum/${id}`, id);
    return res.data;
}

export const deleteTopicApi= async (id) => {
    const res = await foodApi.delete(`/api/topic/${id}`);
    return res.data;
}

export const deleteAllTopicApi = async () => {
    const res = await foodApi.delete(`/api/topic`);
    return res.data;
}

// foodGroup api
export const getFoodGroup = async () => {
    const res = await foodApi.get('/api/foodgroup');
    return res.data;
}

export const getFoodGroupById = async (id) => {
    const res = await foodApi.get(`/api/foodgroup/${id}`);
    return res.data;
}

export const getFoodGroupByTid = async (id) => {
    const res = await foodApi.get(`/api/foodgroup/tid/${id}`);
    return res.data;
}

export const addFoodGroup = async (foodgroup) => {
    const res = await foodApi.post('/api/foodgroup', foodgroup);
    return res.data;
}

export const updateFoodGroup = async (foodGroup) => {
    const res = await foodApi.post(`/api/foodgroup/${foodGroup.id}`, foodGroup);
    return res.data;
}

export const deleteFoodGroupItem = async (gid) => {
    const res = await foodApi.delete(`/api/foodgroup/${gid}`);
    return res.data;
}

export const deleteFoodGroupByTidApi = async (id) => {
    const res = await foodApi.delete(`/api/foodgroup/tid/${id}`);
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

export const deleteFoodApi = async (id) => {
    const res = await foodApi.delete(`/api/food/${id}`);
    return res.data;
}

export const deleteFoodByTidApi = async (id) => {
    const res = await foodApi.delete(`/api/food/tid/${id}`);
    return res.data;
}

export const updateStoredFoodApi = async (Food) => {
    const res = await foodApi.post(`/api/food/stored/${Food.id}`, Food);
    return res.data;
}