import axios from 'axios';

const CartApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


// cart api
export const getCartApi = async () => {
    const res = await CartApi.get('/api/cart');
    return res.data;
}

export const getCartByUidApi = async (userID) => {
    const res = await CartApi.get(`/api/cart/uid/${userID}`);
    return res.data;
}


export const getCartByIdApi = async (id) => {
    const res = await CartApi.get(`/api/cart/${id}`);
    return res.data;
}

export const addCartApi = async (cart) => {
    const res = await CartApi.post('/api/cart', cart);
    return res.data;
}

export const updateCartApi = async (cart) => {
    const res = await CartApi.post(`/api/cart/${cart.id}`, cart);
    return res.data;
}

export const updateCartFoodApi = async (cart) => {
    const res = await CartApi.post(`/api/cart/food`, cart);
    return res.data;
}

export const deleteCartApi = async (id) => {
    const res = await CartApi.delete(`/api/cart/${id}`);
    return res.data;
}