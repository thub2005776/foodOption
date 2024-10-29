import axios from 'axios';

const foodType = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


// foodtype api
export const getFoodTypeApi = async () => {
    const res = await foodType.get('/api/foodtype');
    return res.data;
}

export const getFoodTypeByUidApi = async (userID) => {
    const res = await foodType.get(`/api/foodtype/uid/${userID}`);
    return res.data;
}

export const getfoodtypeBySIdApi = async (staffId) => {
    const res = await foodType.get(`/api/foodtype/tid/${staffId}`);
    return res.data;
}

export const getfoodtypeByIdApi = async (Id) => {
    const res = await foodType.get(`/api/foodtype/${Id}`);
    return res.data;
}

export const addFoodTypeApi = async (foodtype) => {
    const res = await foodType.post('/api/foodtype', foodtype);
    return res.data;
}

export const updatefoodType = async (foodtype) => {
    const res = await foodType.post(`/api/foodtype/${foodtype.id}`, foodtype);
    return res.data;
}

export const updatefoodtypeFoodApi = async (foodtype) => {
    const res = await foodType.post(`/api/foodtype/${foodtype.foodtypeID}/${foodtype.index}`, foodtype);
    return res.data;
}

export const updatefoodtypeStatusApi = async (foodtype) => {
    const res = await foodType.post(`/api/foodtype/status/${foodtype.id}`, foodtype);
    return res.data;
}

export const deleteFoodTypeApi = async (id) => {
    const res = await foodType.delete(`/api/foodtype/${id}`);
    return res.data;
}