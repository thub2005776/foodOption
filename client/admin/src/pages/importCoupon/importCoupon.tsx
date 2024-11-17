import React, { useState } from "react";
import { BackButton, DateTimeDisplay, Delete, ImportCouponDetail, SelectUserModal } from "../../components";
import { useMutation, useQuery } from "react-query";
import { getUserApi } from "../../api/user";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { addImportCouponApi, deleteImportCouponApi, getImportCouponBackupIdApi, getImportCouponByIdApi, updateImportCouponBackupApi } from "../../api/importCouponApi";
import { Statistic, message } from "antd";

export default function ImportCoupon() {
    const user = useSelector(selectUser);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate()

    const { data: impt } = useQuery(id, () => getImportCouponByIdApi(id));
    const { data: imptBackup } = useQuery(`${id}backup`, () => getImportCouponBackupIdApi(id));

    const defaultValue = {
        name: 'Chưa cập nhật',
        phone: 'Chưa cập nhật',
        address: 'Chưa cập nhật',
        email: 'Chưa cập nhật',
    }

    const [messageApi, contextHolder] = message.useMessage();
    const [supplier, setSupplier] = useState(impt && impt['supplier'] ? impt['supplier'] : defaultValue);
    const [staff, setStaff] = useState(impt && impt['staff'] ? impt['staff'] : defaultValue);
    const [noted, setNoted] = useState(impt && impt['_id'] ? impt['noted'] : '');
    const [detail, setDetail] = useState(impt && impt['_id'] ? impt['detail'] : [{}]);
    const [edited, setEdited] = useState(false);

    const { data: supplieres } = useQuery('supplieres', () => getUserApi('supplier'));
    const { data: staffs } = useQuery('staffs', () => getUserApi('staff'));

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Lưu thành công!',
        });
    };

    const total = (arr: Array<Object>) => {
        var sum = 0;
        if (arr.length > 0 && arr[0]['cost']) {
            arr.forEach(e => {
                sum += e['cost'] * e['quantity']
            })
        }
        return sum;
    };

    const handleSelectedSupplier = (res: string) => {
        const selectedSupplier = Array.isArray(supplieres) && supplieres.length > 0 && supplieres.find(f => f['_id']['$oid'] === res);
        setSupplier(selectedSupplier);
    }


    const handleSelectedStaff = (res: string) => {
        const selectedStaff = Array.isArray(staffs) && staffs.length > 0 && staffs.find(f => f['_id']['$oid'] === res);
        setStaff(selectedStaff);
    }

    const handleAddDetail = () => {
        var detailArr = [{}]
        detailArr = detail;
        const detailValues = {
            index: detailArr.length,
            foodType: '',
            name: '',
            cost: '',
            quantity: 0,
            unit: '',
            exp: '',
            caution: '',
            deleted: false,
        }
        detailArr.push(detailValues);

        setDetail(detailArr)
    }

    const handleRefCallback = (value: Object) => {
        var detailArr = [{}]
        detailArr = detail;

        if (value['deleted']) {
            const  removed =  detailArr.splice(value['index'] -1 , 1)
            
        } else {
            detailArr[value['index'] - 1] = value;
        }
        
        console.log(value);
        
        setDetail(detailArr);
    }

    const deletedImportCoupon = useMutation(
        deleteImportCouponApi, {
        onSuccess(data, variables, context) {
            if (data === 'successfull') {
                navigate(-1);
                // document.location.reload()
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    }
    )

    const handleDeleted = (res: boolean) => {
        if (res) {
            deletedImportCoupon.mutate(id);
        }
    }

    const addImportCoupon = useMutation(
        addImportCouponApi, {
        onSuccess(data, variables, context) {
            if (data === 'successfull') {
                success()
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    })

    const handdleAddImportCoupon = () => {
        const values = {
            id: id !== 'add' ? id : null,
            supplier: supplier,
            staff: staff,
            detail: detail,
            total: total(detail),
            noted: noted,
        }

        addImportCoupon.mutate(values);
    }

    const updatedImptBackup = useMutation(
        updateImportCouponBackupApi, {
        onSuccess(data, variables, context) {
            if (data === 'successfull') {
                console.log(data);

            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    }
    )

    const handleEdited = () => {
        setEdited(!edited);

        const backupValues = {
            supplier: impt['supplier'],
            staff: impt['staff'],
            detail: impt['detail'],
            total: impt['total'],
            noted: impt['noted'],
            editedID: impt['_id']['$oid'],
        }

        if (imptBackup['editedID']) {
            updatedImptBackup.mutate(backupValues)
        } else {
            addImportCoupon.mutate(backupValues)
        }
    }

    const deleteImptBackup = useMutation(
        deleteImportCouponApi, {
            onSuccess(data, variables, context) {
                if (data === 'successfull') {
                    console.log(data);
                    
                }
            }, onError(error, variables, context) {
                console.log(error);
    
            },
        }
    )

    const handleReverted = () => {
        const values = {
            id: id,
            supplier: imptBackup['supplier'],
            staff: imptBackup['staff'],
            detail: imptBackup['detail'],
            total: imptBackup['total'],
            noted: imptBackup['noted'],
        }

        addImportCoupon.mutate(values);
        deleteImptBackup.mutate(imptBackup['_id']['$oid']);
    }


    return (
        Array.isArray(supplieres) && Array.isArray(staffs) && user &&
        <div className="lg:mx-32 mx-10 mt-10">
            {contextHolder}
            <BackButton />
            <div className="flex gap-5 justify-center">
                <p className="text-2xl text-center font-bold text-gray-900 dark:text-white">PHIẾU NHẬP HÀNG</p>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        onChange={handleEdited}
                        type="checkbox"
                        value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Chỉnh sửa</span>
                </label>
               {imptBackup?.editedID && edited &&
                <button type="button"
                onClick={handleReverted}
                 className="text-white bg-purple-700 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                    <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4" />
                    </svg>
                    Khôi phục
                </button>}
            </div>

            {/* Supplier info */}
            <div className="flex justify-between p-4 mb-5 rounded-sm shadow-sm bg-gray-100/65 dark:bg-gray-800">
                <div >
                    <p className="text-gray-900 dark:text-white">Tên nhà cung cấp: {supplier.name}</p>
                    <p className="text-gray-900 dark:text-white">Số điện thoại: {supplier.phone}</p>
                    <p className="text-gray-900 dark:text-white">Địa chỉ: {supplier.address}</p>
                </div>
                {edited && <SelectUserModal useres={supplieres} updated={handleSelectedSupplier} />}
            </div>
            {/* Staff info */}
            <div className="flex justify-between p-4 mb-5 rounded-sm shadow-sm bg-gray-100/65 dark:bg-gray-800">
                <div>
                    <p className="text-gray-900 dark:text-white">Tên nhân viên: {staff.name}</p>
                    <p className="text-gray-900 dark:text-white">Số điện thoại: {staff.phone}</p>
                    <p className="text-gray-900 dark:text-white">Email: {staff.email}</p>
                </div>
                {edited && <SelectUserModal useres={staffs} updated={handleSelectedStaff} />}
            </div>
            {/* Detail */}
            <div>
                <p className="text-xl font-bold text-center mb-5 border-t-2 p-1">Chi tiết phiếu nhập</p>
                {edited &&
                    <button
                        onClick={handleAddDetail}
                        type="button" className="absolute right-0 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Thêm
                    </button>}
                <div className="relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Số
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nhóm thực phẩm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tên thực phẩm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Khối lượng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Đơn vị
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Giá cả
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Lưu ý
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Hạn sử dụng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(detail) && detail.map((item, i) => (
                                <ImportCouponDetail key={i} detail={item} index={i + 1} edited={edited} refCallbackValue={handleRefCallback} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* total */}
            <div className="flex justify-between p-4 mb-5 rounded-sm shadow-sm bg-gray-100/65 dark:bg-gray-800">
                <div >
                    <p className="text-gray-900 dark:text-white">Thành tiền:
                        <Statistic valueStyle={{ color: '#e02424' }} value={total(detail)} suffix="đ" />
                    </p>
                    <p className="text-gray-900 dark:text-white">Thời gian tạo phiếu:
                        <DateTimeDisplay datetime={impt && impt['createdAt'] ? impt['createdAt']['$date'] : Date()} /></p>
                    <p className="text-gray-900 dark:text-white">Cập nhật: <DateTimeDisplay datetime={Date()} /></p>
                </div>
            </div>
            {/* note */}
            <div className="mb-5 flex-1">
                <label htmlFor="noted" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ghi chú (nếu có)
                </label>
                <textarea
                    onChange={(e) => setNoted(e.target.value)}
                    id="noted"
                    disabled={!edited}
                    defaultValue={noted}
                    rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
            </div>
            {/* action */}
            {edited &&
                <div className="mb-6 flex gap-4">
                    <Delete name="phiếu nhập" res={handleDeleted} />
                    <button
                        onClick={handdleAddImportCoupon}
                        type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Lưu
                    </button>
                </div>}
        </div>
    )
}