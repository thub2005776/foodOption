import axios from 'axios';

const sataticsApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

export const getProfitApi = async (time) => {
    const res = await sataticsApi.get(`/api/satatics/profit/${time}`);
    return res.data;
}

export const getStataticsApi = async (time) => {
    const res = await sataticsApi.get(`/api/satatics/${time}`);
    return res.data;
}

export const StataticsYearsApi = async (times) => {
    const res = await sataticsApi.post(`/api/satatics/years`, times);
    return res.data;
}

export const StataticsOptionApi = async (time) => {
    const res = await sataticsApi.post(`/api/satatics/option`, time);
    return res.data;
}

export const getFoodStataticsByTimeApi = async (id, time) => {
    const res = await sataticsApi.get(`/api/satatics/food/${id}/${time}`);
    return res.data;
}

export const getFoodStataticsApi = async (id, time) => {
    const res = await sataticsApi.get(`/api/satatics/food/${id}/by/${time}`);
    return res.data;
}

export const FoodStataticsYearsApi = async (times) => {
    const res = await sataticsApi.post(`/api/satatics/food/years`, times);
    return res.data;
}

export const FoodStataticsOptionApi = async (time) => {
    const res = await sataticsApi.post(`/api/satatics/food/option`, time);
    return res.data;
}