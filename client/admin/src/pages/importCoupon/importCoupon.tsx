import React, { useState } from "react";
import { BackButton, DateTimeDisplay, Delete, ImportCouponDetail, SelectUserModal } from "../../components";
import { useMutation, useQuery } from "react-query";
import { getUserApi } from "../../api/user";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { addImportCouponApi, deleteImportCouponApi, getImportCouponByIdApi } from "../../api/importCouponApi";
import { Statistic, message } from "antd";

export default function ImportCoupon() {
    const user = useSelector(selectUser);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate()

    const { data: impt } = useQuery(id, () => getImportCouponByIdApi(id));

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
        const detailArr = detail;
        detailArr.push({});

        setDetail(detailArr)
    }

    const handleRefCallback = (value: Object) => {
        const detailArr = detail;
        detailArr[value['index'] - 1] = value;

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
                navigate(-1)
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    }
    )

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

    return (
        Array.isArray(supplieres) && Array.isArray(staffs) && user &&
        <div className="lg:mx-32 mx-10 mt-10">
            {contextHolder}
            <BackButton />
            <p className="text-2xl text-center font-bold text-gray-900 dark:text-white">PHIẾU NHẬP HÀNG</p>
            {/* Supplier info */}
            <div className="flex justify-between p-4 mb-5 rounded-sm shadow-sm bg-gray-100/65 dark:bg-gray-800">
                <div >
                    <p className="text-gray-900 dark:text-white">Tên nhà cung cấp: {supplier.name}</p>
                    <p className="text-gray-900 dark:text-white">Số điện thoại: {supplier.phone}</p>
                    <p className="text-gray-900 dark:text-white">Địa chỉ: {supplier.address}</p>
                </div>
                <SelectUserModal useres={supplieres} updated={handleSelectedSupplier} />
            </div>
            {/* Staff info */}
            <div className="flex justify-between p-4 mb-5 rounded-sm shadow-sm bg-gray-100/65 dark:bg-gray-800">
                <div>
                    <p className="text-gray-900 dark:text-white">Tên nhân viên: {staff.name}</p>
                    <p className="text-gray-900 dark:text-white">Số điện thoại: {staff.phone}</p>
                    <p className="text-gray-900 dark:text-white">Email: {staff.email}</p>
                </div>
                <SelectUserModal useres={staffs} updated={handleSelectedStaff} />
            </div>
            {/* Detail */}
            <div>
                <p className="text-xl font-bold text-center mb-5 border-t-2 p-1">Chi tiết phiếu nhập</p>
                <button
                    onClick={handleAddDetail}
                    type="button" className="absolute right-0 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Thêm
                </button>
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
                                <ImportCouponDetail key={i} detail={item} index={i + 1} refCallbackValue={handleRefCallback} />
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
                    defaultValue={noted}
                    rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
            </div>
            {/* action */}
            <div className="mb-6 flex gap-4">
                <Delete name="phiếu nhập" res={handleDeleted} />
                <button
                    onClick={handdleAddImportCoupon}
                    type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Lưu
                </button>
            </div>
        </div>
    )
}