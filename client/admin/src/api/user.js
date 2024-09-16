import axios from 'axios';

const userApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


// user
export const getUserApi = async (type) => {
    const res = await userApi.get(`/api/acc/${type}`);
    return res.data;
}

export const getUserByIdApi = async (id, type) => {
    const res = await userApi.get(`/api/acc/${type}/${id}`);
    return res.data;
}

export const addUserApi = async (user) => {
    const res = await userApi.post(`/api/acc/${user.type}`, user);
    return res.data;
}

export const updateUserApi = async (user) => {
    const res = await userApi.post(`/api/acc/${user.type}/${user.id}`, user);
    return res.data;
}

export const deleteUserApi = async (user) => {
    const res = await userApi.delete(`/api/acc/${user.type}/${user.id}`);
    return res.data;
}

// admin


export const addAdminApi = async (admin) => {
    const res = await userApi.post('/api/admin', admin);
    return res.data;
}

export const updateAdminApi = async (admin) => {
    const res = await userApi.post(`/api/admin/${admin.id}`, admin);
    return res.data;
}

export const deleteAdminApi = async (id) => {
    const res = await userApi.delete(`/api/admin/${id}`);
    return res.data;
}

// Supplier


export const addSupplierApi = async (supplier) => {
    const res = await userApi.post('/api/supplier', supplier);
    return res.data;
}

export const updateSupplierApi = async (supplier) => {
    const res = await userApi.post(`/api/supplier/${supplier.id}`, supplier);
    return res.data;
}

export const deleteSupplierApi = async (id) => {
    const res = await userApi.delete(`/api/supplier/${id}`);
    return res.data;
}

// Staff


export const addStaffApi = async (staff) => {
    const res = await userApi.post('/api/staff', staff);
    return res.data;
}

export const updateStaffApi = async (staff) => {
    const res = await userApi.post(`/api/staff/${staff.id}`, staff);
    return res.data;
}

export const deleteStaffApi = async (id) => {
    const res = await userApi.delete(`/api/staff/${id}`);
    return res.data;
}

// role
export const getRoleApi = async () => {
    const res = await userApi.get('/api/role');
    return res.data;
}

export const addRoleApi = async (role) => {
    const res = await userApi.post('/api/role', role);
    return res.data;
}

export const updateRoleApi = async (role) => {
    const res = await userApi.post(`/api/role/${role._id}`, role);
    return res.data;
}

export const deleteRoleApi = async (id) => {
    const res = await userApi.delete(`/api/role/${id}`);
    return res.data;
}