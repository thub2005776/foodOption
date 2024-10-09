import axios from 'axios';

const OrderApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


// order api
export const getOrderApi = async () => {
    const res = await OrderApi.get('/api/order');
    return res.data;
}

export const getOrderByUidApi = async (userID) => {
    const res = await OrderApi.get(`/api/order/uid/${userID}`);
    return res.data;
}

// export const getOrderBySIdApi = async (staffId) => {
//     const res = await OrderApi.get(`/api/order/tid/${staffId}`);
//     return res.data;
// }

export const getOrderByIdApi = async (Id) => {
    const res = await OrderApi.get(`/api/order/${Id}`);
    return res.data;
}

export const addOrderApi = async (order) => {
    const res = await OrderApi.post('/api/order', order);
    return res.data;
}

export const updateOrderApi = async (order) => {
    const res = await OrderApi.post(`/api/order/${order.id}`, order);
    return res.data;
}

export const updateOrderFoodApi = async (order) => {
    const res = await OrderApi.post(`/api/order/${order.orderID}/${order.index}`, order);
    return res.data;
}

export const deleteOrderApi = async (id) => {
    const res = await OrderApi.delete(`/api/order/${id}`);
    return res.data;
}