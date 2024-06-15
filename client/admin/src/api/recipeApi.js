import axios from 'axios';

const recipeApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

export const getRecipeApi = async () => {
    const res = await recipeApi.get('/api/recipe');
    return res.data;
}

export const addRecipeApi = async (recipe) => {
    const res = await recipeApi.post('/api/recipe', recipe);
    return res.data;
}

export const updateRecipeApi = async (recipe) => {
    const res = await recipeApi.post(`/api/recipe${recipe._id}`, recipe);
    return res.data;
}