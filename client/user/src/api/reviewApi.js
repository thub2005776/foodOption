import axios from 'axios';

const reviewApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


// review api
export const getReviewApi = async () => {
    const res = await reviewApi.get('/api/review');
    return res.data;
}

export const getReviewByUidApi = async (userID) => {
    const res = await reviewApi.get(`/api/review/uid/${userID}`);
    return res.data;
}

export const getReviewByCIdApi = async (checkID) => {
    const res = await reviewApi.get(`/api/review/cid/${checkID}`);
    return res.data;
}

export const getReviewByFIdApi = async (foodID) => {
    const res = await reviewApi.get(`/api/review/fid/${foodID}`);
    return res.data;
}

export const getReviewByIdApi = async (Id) => {
    const res = await reviewApi.get(`/api/review/${Id}`);
    return res.data;
}

export const addReviewApi = async (review) => {
    const res = await reviewApi.post('/api/review', review);
    return res.data;
}

export const updateReviewApi = async (review) => {
    const res = await reviewApi.post(`/api/review/${review.id}`, review);
    return res.data;
}

// export const updateReviewFoodApi = async (review) => {
//     const res = await reviewApi.post(`/api/review/${review.reviewID}/${review.index}`, review);
//     return res.data;
// }

export const deleteReviewByUidApi = async (id) => {
    const res = await reviewApi.delete(`/api/review/uid/${id}`);
    return res.data;
}

export const deleteReviewByCidApi = async (id) => {
    const res = await reviewApi.delete(`/api/review/cid/${id}`);
    return res.data;
}

export const deleteReviewApi = async (id) => {
    const res = await reviewApi.delete(`/api/review/${id}`);
    return res.data;
}