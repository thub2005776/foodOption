import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useMutation, useQuery } from "react-query";
import { addUserApi, getRoleApi, getUserByIdApi, updateUserApi } from "../../api/user";
import { BackButton } from "../../components";
import { uploadApi, downloadApi } from "../../api/uploadFileApi";

export default function AccForm() {
    const { data: roles } = useQuery('roles', () => getRoleApi())
    const user = useSelector(selectUser);
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    const type = location.pathname.split('/')[2];

    const { data: userAcc } = useQuery(id, () => getUserByIdApi(id, type));
    const { data: imageFile } = useQuery(type, () => downloadApi(userAcc?.image ? userAcc['image'] : 'food.jpg'))

    const [open, setOpen] = useState(false);
    const [openRole, setOpenRole] = useState(false);
    const [openActived, setOpenActived] = useState(false);
    const [changePassword, setChangePassword] = useState(false)

    const [imageLink, setImageLink] = useState('');
    const [file, setFile] = useState<File | null>();
    const [name, setName] = useState(userAcc?.name ? userAcc['name'] : '');
    const [gender, setGender] = useState(userAcc?.gender ? userAcc['gender'] : 'Nam');
    const [birthday, setBirthday] = useState(userAcc?.birthday ? userAcc['birthday'] : '');
    const [email, setEmail] = useState(userAcc?.email ? userAcc['email'] : '');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(userAcc?.phone ? userAcc['phone'] : '');
    const [role, setRole] = useState(userAcc?.role ? userAcc['role'] : type);
    const [address, setAddress] = useState(userAcc?.address ? userAcc['address'] : '');
    const [actived, setActived] = useState(userAcc?.actived ? userAcc['actived'] : true);

    const onChange: DatePickerProps['onChange'] = (date) => {
        setBirthday(date && date['$d'])
    };
    const handleFileChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        setFile(file)

        const imageUrl = URL.createObjectURL(file); // Tạo URL đại diện cho file ảnh
        setImageLink(imageUrl);
    };

    const upload = useMutation(uploadApi);
    const addUser = useMutation(
        addUserApi, {
        onSuccess(data) {
            if (data === 'successfull') {
                document.location.reload()
            } else alert(data)
        },
        onError: (err) => { console.log(err) }
    }
    );

    const updateUser = useMutation(
        updateUserApi, {
        onSuccess(data) {
            if (data === 'successfull') {
                document.location.reload()
            } else alert(data)
        },
        onError: (err) => { console.log(err) }
    }
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('file', file!)

        const values = {
            id: id,
            name: name,
            gender: gender,
            birthday: birthday,
            image: file?.name,
            email: email,
            password: changePassword || password.length > 0 ? password : null,
            phone: phone,
            address: address,
            role: role,
            actived: actived,
            createdAt: userAcc?.createdAt ? null : Date(),
            updatedAt: Date(),
            type: String(role).toLocaleLowerCase(),
        }

        if (file) {
            upload.mutate(formData, {
                onSuccess: (data) => {
                    if (data === "uploaded") {
                        if (userAcc?.name) {
                            updateUser.mutate(values)
                        } else {
                            addUser.mutate(values)
                        }

                    } else alert(data)
                },
                onError: (err) => console.log(err)
            });
        } else if (userAcc?.name) {
            updateUser.mutate(values)
        }
    }
    
    return (
        user && roles && userAcc &&
        <div className="mx-10">
            <div className="fixed ml-1 top-32">
                <BackButton />
            </div>
            <p className="text-gray-900 dark:text-gray-400 text-center font-bold text-lg mb-2">Thông tin</p>
            <form
                onSubmit={handleSubmit}
                className=" md:flex justify-center gap-5 dark:bg-gray-800  p-2 rounded-md">
                <div className="">
                    <div className="">
                        {imageLink.length > 0 && imageFile ?
                            <div className="w-64 h-64">
                                <img src={imageLink || URL.createObjectURL(imageFile)} className="w-64 h-64 rounded-full" alt="UploadedImage" />
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                    </div>
                                    <input
                                        onChange={handleFileChange}
                                        id="dropzone-file"
                                        name="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>

                            :
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                </div>
                                <input
                                    onChange={handleFileChange}
                                    id="dropzone-file"
                                    name="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>}
                    </div>

                </div>
                <div className="w-full">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tài khoản
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            defaultValue={userAcc['name']}
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="mb-5">
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Giới tính
                            </label>

                            <button
                                onClick={() => setOpen(!open)}
                                id="dropdownDefaultButton"
                                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                                {gender}
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>


                            {open &&
                                <div id="dropdownGender" className="z-[100] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                        <li
                                            onClick={() => {
                                                setGender('Nam')
                                                setOpen(false)
                                            }}>
                                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Nam
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setGender('Nữ')
                                                setOpen(false)
                                            }}>
                                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Nữ
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setGender('Khác')
                                                setOpen(false)
                                            }}>
                                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Khác
                                            </div>
                                        </li>
                                    </ul>
                                </div>}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Ngày sinh
                            </label>
                            <Space direction="vertical">
                                <DatePicker
                                    defaultValue={birthday.length > 0? dayjs(birthday):null}
                                    size="large"
                                    onChange={onChange} />
                            </Space>
                        </div>

                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Số điện thoại
                        </label>
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            defaultValue={userAcc['phone']}
                            type="text"
                            pattern="[0-9]{10}"
                            id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Chức vụ
                        </label>

                        <button
                            onClick={() => setOpenRole(!openRole)}
                            id="dropdownRole"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                            {role}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>


                        {openRole &&
                            <div id="dropdown" className="z-[100] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    {Array.isArray(roles) && roles.map((item, i) => (
                                        <li
                                            key={i}
                                            onClick={() => {
                                                setRole(item['role'])
                                                setOpenRole(false)
                                            }}>
                                            <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                {item['role']}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>}
                    </div>
                </div>
                <div className="w-full">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={userAcc['email']}
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Mật khẩu
                        </label>

                        {userAcc?.password && !changePassword ?
                            <button 
                            onClick={() => setChangePassword(true)}
                            type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >Đổi mật khẩu
                            </button>
                            : <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        }

                    </div>
                    <div className="mb-5">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Địa chỉ
                        </label>
                        <textarea
                            onChange={(e) => setAddress(e.target.value)}
                            defaultValue={userAcc['address']}
                            id="address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                        </textarea>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="actived" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Trạng thái
                        </label>

                        <button
                            onClick={() => setOpenActived(!openActived)}
                            id="dropdownActived"
                            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                            {actived ? "Active" : "Disable"}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>


                        {openActived &&
                            <div id="dropdownActve" className="z-[100] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li
                                        onClick={() => {
                                            setActived(true)
                                            setOpenActived(false)
                                        }}>
                                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Active
                                        </div>
                                    </li>
                                    <li
                                        onClick={() => {
                                            setActived(false)
                                            setOpenActived(false)
                                        }}>
                                        <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Disable
                                        </div>
                                    </li>
                                </ul>
                            </div>}
                    </div>
                    <button
                        type="submit"
                        className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Submit
                    </button>
                </div>

            </form>
        </div>

    )
}