import axios from 'axios';

const importCoupon = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


// Import Coupon API
export const getImportCouponApi = async () => {
    const res = await importCoupon.get('/api/importcoupon');
    return res.data;
}

export const getImportCouponByUserIDApi = async (userID, type) => {
    const res = await importCoupon.get(`/api/importcoupon/${type}/${userID}`);
    return res.data;
}

export const getImportCouponByIdApi = async (Id) => {
    const res = await importCoupon.get(`/api/importcoupon/${Id}`);
    return res.data;
}

export const addImportCouponApi = async (importcoupon) => {
    const res = await importCoupon.post('/api/importcoupon', importcoupon);
    return res.data;
}

export const updateImportCoupon = async (importcoupon) => {
    const res = await importCoupon.post(`/api/importcoupon/${importcoupon.id}`, importcoupon);
    return res.data;
}


export const deleteImportCouponApi = async (id) => {
    const res = await importCoupon.delete(`/api/importcoupon/${id}`);
    return res.data;
}

// backup
export const getImportCouponBackupIdApi = async (Id) => {
    const res = await importCoupon.get(`/api/importcoupon/backup/${Id}`);
    return res.data;
}

export const updateImportCouponBackupApi = async (importcoupon) => {
    const res = await importCoupon.post(`/api/importcoupon/backup/${importcoupon.id}`, importcoupon);
    return res.data;
}


export const deleteImportCouponBackupApi = async (id) => {
    const res = await importCoupon.delete(`/api/importcoupon/backup/${id}`);
    return res.data;
}