import React, { useState } from "react";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { addAddressApi, updateAddressApi, updateAddressByUidApi, updateUserApi } from "../../api/user";

export default function AddressModal({ type, addressItem }: { type: string, addressItem: Object }) {
    const user = useSelector(selectUser);
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState(addressItem['username'] ? addressItem['username'] : '');
    const [phone, setPhone] = useState(addressItem['phone'] ? addressItem['phone'] : '');
    const [newAddress, setNewAddress] = useState(addressItem['address'] ? addressItem['address'] : '');
    const [actived, setActived] = useState(addressItem['actived'] ? addressItem['actived'] : false);

    // const handleSetLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //             var latitude = position.coords.latitude;
    //             var longitude = position.coords.longitude;
    //             console.log(latitude);
    //             console.log(longitude);
    //         });
    //     } else {
    //         // Xử lý khi trình duyệt không hỗ trợ Geolocation API
    //         alert("trình duyệt không hỗ trợ Geolocation API")
    //     }
    // }

    const updateActiveAddress = useMutation(
        updateAddressByUidApi, {
        onSuccess(data) {
            if (data !== 'successfull') {
                alert(data)
            }
        },
        onError: (err) => { console.log(err) }
    }
    )

    const addAddress = useMutation(
        addAddressApi, {
        onSuccess(data) {
            if (data === 'successfull') {
                document.location.reload()
            } else alert(data)
        },
        onError: (err) => { console.log(err) }
    })

    const updateAddress = useMutation(
        updateAddressApi, {
        onSuccess(data) {
            if (data === 'successfull') {
                document.location.reload()
            } else alert(data)
        },
        onError: (err) => { console.log(err) }
    })

    const updateAddressOfUser = useMutation(
        updateUserApi, {
        onSuccess(data) {
            if (data === 'successfull') {
                console.log(data);
                
            } else alert(data)
        },
        onError: (err) => { console.log(err) }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const address = {
            id: addressItem['_id']?.$oid,
            userID: user['_id']!.$oid,
            username: username,
            phone: phone,
            address: newAddress,
            createdAt: type === 'add' ? Date() : null,
            updatedAt: Date(),
            actived: actived,
            type: 'user',
        }


        if (actived) {
            const value = {
                type: 'user',
                id: user['_id']!.$oid,
                actived: false,
            }

            const addressOfUser = {
                AddressID: addressItem['_id']?.$oid,
                id: user['_id']!.$oid,
                type: 'user',
                address: newAddress,
            }

            updateAddressOfUser.mutate(addressOfUser);
            updateActiveAddress.mutate(value)
        }

        if (type === 'add') {
            addAddress.mutate(address)
        } else { updateAddress.mutate(address) }

    }
    return (
        <div>
            {/* <!-- Modal toggle --> */}
            {type === 'add' ?
                <button
                    onClick={() => setOpen(true)}
                    type="button"
                    className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Thêm địa chỉ
                </button>
                : <button
                    onClick={() => setOpen(true)}
                    type="button"
                    className=" text-white bg-gradient-to-br from-yellow-300 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Sửa
                </button>}

            {/* <!-- Main modal --> */}
            {open &&
                <div id="select-modal" className="overflow-y-auto overflow-x-hidden  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="absolute z-[1000] top-[15%] right-[5%] p-4 w-full max-w-md max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {type === 'add' ? 'Thêm địa chỉ mới' : 'Sửa địa chỉ'}
                                </h3>
                                <button
                                    onClick={() => setOpen(false)}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-4 md:p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div className="flex gap-4 mb-6">
                                            <div className="p-4">
                                                <label htmlFor="username" className="text-gray-900 dark:text-white">Tên người nhận</label>
                                                <input
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    type="text"
                                                    id="username"
                                                    className="w-full border border-blue-600 rounded-md text-sm text-gray-900 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white"
                                                    defaultValue={username} />
                                            </div>
                                            <div className="p-4">
                                                <label htmlFor="phone" className="text-gray-900 dark:text-white">Số điện thoại</label>
                                                <input
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    type="number"
                                                    id="phone"
                                                    className="w-full border border-blue-600 rounded-md text-sm text-gray-900 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white"
                                                    defaultValue={phone} />
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 mb-3 bg-white rounded-t-lg dark:bg-gray-800">
                                            <label htmlFor="address" className="text-gray-900 dark:text-white">Địa chỉ mới</label>
                                            <textarea id="address" rows={4}
                                                onChange={(e) => setNewAddress(e.target.value)}
                                                className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                placeholder="Nhập địa chỉ..."
                                                defaultValue={addressItem['address']} ></textarea>
                                        </div>


                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <button
                                                onClick={() => setActived(!actived)}
                                                type="button"
                                                className={`${actived ? "text-white bg-green-700 hover:bg-green-800  dark:bg-green-600 dark:hover:bg-green-700"
                                                    : "text-gray-900 bg-gray-400"}" dark:text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"`}>
                                                Đặt làm mặc định
                                            </button>
                                            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                                    </svg>
                                                    <span className="sr-only">Set location</span>
                                                </button>
                                            </div>

                                        </div>
                                        <div className="flex gap-5 m-2">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                {type === 'add' ? 'Thêm' : 'Lưu'}
                                            </button>
                                            <button
                                                onClick={() => setOpen(false)}
                                                type="button"
                                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-700 dark:text-white hover:text-white  rounded-lg focus:ring-4 focus:ring-orange-200 dark:focus:ring-orange-900 hover:bg-orange-800">
                                                Huỷ
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}