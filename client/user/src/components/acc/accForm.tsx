import React, { useState } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";

import { useMutation, useQuery } from "react-query";
import { uploadApi, downloadApi } from "../../api/uploadFileApi";
import { updateUserApi } from "../../api/user";

export default function AccForm({ account }: { account: Object }) {
    const { data: imageFile } = useQuery(account['_id'].$oid, () => downloadApi(account ? account['image'] : 'avatar.jpg'))

    const [open, setOpen] = useState(false);
    const [changePassword, setChangePassword] = useState(false)

    const [imageLink, setImageLink] = useState('');
    const [file, setFile] = useState<File | null>();
    const [name, setName] = useState(account['name']);
    const [gender, setGender] = useState(account['gender']);
    const [birthday, setBirthday] = useState(account['birthday']);
    const [email, setEmail] = useState(account['email']);
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(account['phone']);

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
            id: account['_id'].$oid,
            name: name,
            gender: gender,
            birthday: birthday,
            image: file?.name,
            email: email,
            password: changePassword || password.length > 0 ? password : null,
            phone: phone,
            updatedAt: Date(),
            type: 'user',
        }

        if (file) {
            upload.mutate(formData, {
                onSuccess: (data) => {
                    if (data === "uploaded") {
                        updateUser.mutate(values)

                    } else alert(data)
                },
                onError: (err) => console.log(err)
            });
        } else {
            updateUser.mutate(values)
        }
    }

    const image = 'https://i.pinimg.com/564x/cf/f9/97/cff9979e9ad2ade5fe0b122143450ab1.jpg';
    return (
        account && imageFile &&
        <div >
            <form
                onSubmit={handleSubmit}
                className="  dark:bg-gray-800  p-2 rounded-md">
                <div className="md:flex justify-center gap-5">
                    <div className="">
                        <div className="">
                            <div className="w-64 h-64">
                                {imageLink.length > 0? 
                                <img src={imageLink}
                                    className="w-64 h-64 rounded-full" alt="UploadedImage" />
                                :<img src={imageFile instanceof Blob ? URL.createObjectURL(imageFile) : image}
                                    className="w-64 h-64 rounded-full" alt="UploadedImage" />}
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


                        </div>

                    </div>
                    <div className="w-full">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tài khoản
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name}
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
                                        defaultValue={birthday?.length > 0 ? dayjs(birthday) : null}
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
                                defaultValue={phone}
                                type="text"
                                pattern="[0-9]{10}"
                                id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                    </div>
                    <div className="w-full">
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                defaultValue={email}
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Mật khẩu
                            </label>

                            {password.length === 0 && !changePassword ?
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


                    </div>
                </div>
                <button
                    type="submit"
                    className="float-right w-fit text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >Lưu
                </button>

            </form>
        </div>
    )
}