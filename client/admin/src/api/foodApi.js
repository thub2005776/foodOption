import axios from 'axios';

const foodApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

// foodGrou api
export const getFoodGroup = async () => {
    const res = await foodApi.get('/api/foodgroup');
    return res.data;
}

export const getFoodGroupById = async (id) => {
    const res = await foodApi.get(`/api/foodgroup/${id}`);
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
export const getFood = async () => {
    const res = await foodApi.get('/api/food');
    return res.data;
}

export const addFood = async () => {
    const res = await foodApi.post('/api/food');
    return res.data;
}

export const updateFood = async (Food) => {
    const res = await foodApi.post(`/api/food/${Food._id}`, Food);
    return res.data;
}

