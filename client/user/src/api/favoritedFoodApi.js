import axios from 'axios';

const favoritedFoodApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


// food api
export const getfavoritedFoodApi = async () => {
    const res = await favoritedFoodApi.get('/api/favorited');
    return res.data;
}


export const getFavoritedFoodByIdApi = async (id) => {
    const res = await favoritedFoodApi.get(`/api/favorited/${id}`);
    return res.data;
}

export const addFavoritedFoodApi = async (food) => {
    const res = await favoritedFoodApi.post('/api/favorited', food);
    return res.data;
}

export const updateFavoritedFoodApi = async (Food) => {
    const res = await favoritedFoodApi.post(`/api/favorited/${Food.id}`, Food);
    return res.data;
}

export const deleteFavoritedFoodApi = async (id) => {
    const res = await favoritedFoodApi.delete(`/api/favorited/${id}`);
    return res.data;
}

export const getFavoritedFoodByUidApi = async (uid) => {
    const res = await favoritedFoodApi.get(`/api/favorited/uid/${uid}`);
    return res.data;
}

export const deleteFavoritedFoodByUidApi = async (uid) => {
    const res = await favoritedFoodApi.delete(`/api/favorited/uid/${uid}`);
    return res.data;
}