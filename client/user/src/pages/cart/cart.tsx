import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { CartItem } from "../../components";
import { useMutation, useQuery } from "react-query";
import { getCartByUidApi, deleteFoodItemApi } from "../../api/cartApi";
import { Statistic } from 'antd';
import { addOrderApi } from "../../api/orderApi";
import { updateStoredFoodApi } from "../../api/foodApi";

export default function Cart() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const { data: cart } = useQuery('cart', () => getCartByUidApi(user['_id'].$oid));

    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [checkedFood, setCheckedFood] = useState([{}]);
    const [total, setTotal] = useState(0);
    const [seletedFood, setSelectedFood] = useState(0);

    const sumFunc = (food: Array<Object>) => {
        var sum = 0;
        food.forEach(e => {
            sum += e['food'].price * e['quantity']
        })

        return sum;
    }

    const handleCheckedAll = () => {
        setIsCheckedAll(!isCheckedAll)
        if (!isCheckedAll) {
            const length = cart['detail'].length
            setCheckedFood(cart['detail'])
            const sum = sumFunc(cart['detail'])
            setTotal(sum)
            setSelectedFood(length)
            setIsCheckedAll(true)
        } else {
            setIsCheckedAll(false)
            setCheckedFood([])
            setTotal(0)
            setSelectedFood(0)
        }

    }

    const handleChecked = (checked: Object) => {
        const checkecArr = checkedFood
        if (checked['isChecked']) {
            checkecArr[checked['index']] = cart['detail'][checked['index']]
        } else {
            checkecArr[checked['index']] = {}
        }

        setCheckedFood(checkecArr)

        const food = checkecArr.filter(f => f['food'])

        const sum = sumFunc(food);

        setTotal(sum);
        setSelectedFood(food.length);

        if (food.length === cart['detail'].length) {
            setIsCheckedAll(true)
        } else { setIsCheckedAll(false) }
    }

    const DeletedFoodItem = useMutation(
        deleteFoodItemApi, {
        onSuccess(data, variables, context) {
            if (data !== "successfull") {
                console.log(data);
            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    })

    const updatedStoredFood = useMutation(
        updateStoredFoodApi, {
        onSuccess(data, variables, context) {
            if (data !== "successfull") {
                console.log(data);

            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    })

    const addOrder = useMutation(
        addOrderApi, {
        onSuccess(data, variables, context) {
            if (data['acknowledged']) {
                navigate(`/order/${data['inserted_id']}`)

            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    }
    )

    const handleOrdered = () => {
        const values = {
            userID: user['_id'].$oid,
            address: user['address'],
            detail: checkedFood,
            total: total,
            createdAt: Date(),
            updatedAt: Date(),
            status: [{status: 'pending', time: Date()}],
        }

        checkedFood.forEach(e => {
            const values = {
                userID: user['_id'].$oid,
                foodID: e['food']['_id'].$oid,
                element: e,
                updatedAt: Date(),
            }
            DeletedFoodItem.mutate(values)

            const foodValues = {
                id: e['food']['_id'].$oid,
                quantity: e['quantity'],
                operation: '-',
            }
            if (e['food']['stored'] >= e['quantity']) {
                updatedStoredFood.mutate(foodValues);
           } else { alert('Số lượng đã đến giới hạn tối đa.') }
           
        })

        addOrder.mutate(values)
    }
    
    return (
        user && cart && Array.isArray(cart['detail']) ?
        <div className="lg:mx-20 mx-10">
            <div className="mt-10">
                <div className="mb-6 p-2">
                    <input
                        onChange={handleCheckedAll}
                        id="checkedAll"
                        type="checkbox"
                        checked={isCheckedAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkedAll" className="text-gray-900 dark:text-white ms-3">Chọn tất cả</label>
                </div>

                <ul>
                    {Array.isArray(cart['detail']) && cart['detail'].map((item, i) => (
                        <CartItem
                            key={i}
                            userID={user['_id'].$oid}
                            item={item} index={i}
                            checkedIndex={handleChecked}
                            checkedAll={isCheckedAll} />
                    ))}
                </ul>
            </div>
            <div className="flex justify-between p-2 bg-blue-100 dark:bg-blue-500 rounded-b-lg">
                <p className="text-blue-700 font-bold dark:text-white">
                    <span className="py-0.5 px-2 rounded-full bg-green-500 text-white me-3">{seletedFood}</span>
                    Đã chọn
                </p>
                <div className="flex justify-center gap-2">
                    <p className="mb-3 font-bold text-red-600 dark:text-red-500">
                        <Statistic valueStyle={{ color: '#e02424' }} value={total} suffix="đ" />
                    </p>
                    {seletedFood > 0?
                     <button
                        onClick={handleOrdered}
                        type="button"
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >Đặt món
                    </button>

                    :<button
                        type="button"
                        disabled
                        className="text-white bg-gray-400 dark:bg-gray-700 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Đặt món
                    </button>}

                </div>
            </div>
        </div>: <p className="text-gray-600 text-center mt-32 py-20">Chưa có sản phẩm nào trong giỏ hàng</p>
    );
};