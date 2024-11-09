import React, { useState } from "react";
import { Button, Modal } from 'antd';
import { useMutation } from "react-query"
import { updateFoodApi } from "../../api/foodApi";

export default function UpdatedStoredFoodModal({ food }: { food: Object }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stored, setStored] = useState('');

    const updatedStoredFood = useMutation(
        updateFoodApi, {
        onSuccess(data, variables, context) {
            if (data !== "successfull") {
                document.location.reload()
            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    })
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);

        const foodValues = {
            id: food['_id']['$oid'],
            stored: Number(stored),
        }
        updatedStoredFood.mutate(foodValues);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button type="dashed" onClick={showModal}>
                Stored: {food['stored']}
            </Button>
            <Modal title="Cập nhật số lượng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="mb-5">
                    <label htmlFor="stored" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Stored
                    </label>
                    <input
                        onChange={(e) => setStored(e.target.value)}
                        type="number"
                        id="stored"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        defaultValue={food['stored']} />
                </div>
            </Modal>
        </div>
    )
}