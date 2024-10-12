import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getUserApi } from "../../api/user";
import { SelectUserModal } from "../../components";
import { updateOrderApi } from "../../api/orderApi";

export default function UserForm({ userID, orderID, type }: { userID: string, orderID: string, type: string }) {
    const [open, setOpen] = useState(false);

    const { data: useres } = useQuery(type, () => getUserApi(type));

    const [userInfo, setUserInfo] = useState(useres && useres.find(f => f['_id'].$oid === userID));
    
    
    const updatedOrder = useMutation(
        updateOrderApi, {
        onError(error, variables, context) {
            console.log(error);

        },
    })

    const handledSlected = (result: string) => {
        setUserInfo(Array.isArray(useres) && useres.find(f => f['_id'].$oid === result));

        if (type === 'staff') {
            const values = {
                staffID: result,
                id: orderID,
                updatedAt: Date(),
            }
            updatedOrder.mutate(values)
        } else {
            const values = {
                deliverymanID: result,
                id: orderID,
                updatedAt: Date(),
            }
            updatedOrder.mutate(values)
        }

    }

    return (
        useres &&
        <div className="relative">
            {userInfo && 
            <div
                onClick={() => setOpen(!open)}
                className='flex justify-between gap-5 md:w-72 bg-blue-50 dark:bg-gray-800 p-4 rounded-md'>
                <div className="flex-1 ">
                    <div className="text-base text-gray-900 dark:text-gray-400 font-semibold">{userInfo['name']}</div>
                    <div className="font-normal text-gray-500">(+84) {userInfo['phone']}</div>
                    <div className="flex justify-between">
                        <Link to={`/acc/${type}/${userID}`}>
                            <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Chi tiết
                            </div>
                        </Link>
                    </div>
                </div>
            </div>}
            {type !== 'user' && !userInfo && <SelectUserModal useres={useres} updated={handledSlected} />}
        </div>
    );
};