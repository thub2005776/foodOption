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

// created a new cart of user account
export const addCartApi = async (cart) => {
    const res = await CartApi.post('/api/cart', cart);
    return res.data;
}

// deleted a food item on cart
export const deleteFoodItemApi = async (foodItem) => {
    const res = await CartApi.post(`/api/cart/${foodItem.userID}`, foodItem);
    return res.data;
}

// updated quantity and note
export const updateCartApi = async (cart) => {
    const res = await CartApi.post(`/api/cart/uid/${cart.userID}`, cart);
    return res.data;
}

// updated or insert (food list of detail)
export const updateCartFoodApi = async (cart) => {
    const res = await CartApi.post(`/api/cart/food`, cart);
    return res.data;
}

export const deleteCartApi = async (id) => {
    const res = await CartApi.delete(`/api/cart/uid/${id}`);
    return res.data;
}
