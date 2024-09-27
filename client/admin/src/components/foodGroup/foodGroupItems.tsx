import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton, Delete, FGroupTable, List, TopicModal, FoodGroupModal, AddButton } from "../../components";
import { deleteTopicApi, getFoodByTopicIdApi, getTopicById, getFoodGroupByTid, deleteFoodByTidApi, deleteFoodGroupByTidApi } from "../../api/foodApi";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function FoodGroupItems() {
    const [gid, setGid] = useState('');
    const auth = useSelector(selectUser);
    const navigate = useNavigate()
    const location = useLocation();
    const code = location.pathname.split('/')[2];

    const { data: topic } = useQuery('topic', () => getTopicById(code));
    const { data: foodgroup } = useQuery(`${code}_foodgroup`, () => getFoodGroupByTid(code));
    const { data: food } = useQuery('food', () => getFoodByTopicIdApi(code))

    const deleteFoodByTid = useMutation(
        deleteFoodByTidApi, {
        onSuccess: (data) => {
            if (data === "successfull") {
                
               console.log('food');
               
            } else { alert(data) }
        },
        onError(error) {
            alert(error)
        },
    });

    const deleteFoodGroupByTid = useMutation(
        deleteFoodGroupByTidApi, {
        onSuccess: (data) => {
            if (data === "successfull") {
                
               console.log('foodgroup');
               
            } else { alert(data) }
        },
        onError(error) {
            alert(error)
        },
    });

    const deleteTopic = useMutation(
        deleteTopicApi, {
        onSuccess: (data) => {
            if (data === "successfull") {
                deleteFoodByTid.mutate(code)
                deleteFoodGroupByTid.mutate(code)
                navigate('/admin/tab2')
            } else { alert(data) }
        },
        onError(error) {
            alert(error)
        },
    });


    const handleDelete = (res: boolean) => {
        if (res) {
            deleteTopic.mutate(code)
        }
    }

    return (
        auth && topic && food && Array.isArray(foodgroup) &&
        <div className="h-screen dark:text-white mx-5 lg:mx-32">
            <div className="flex  gap-4 mb-6">
                <BackButton />
            </div>
            <div className="lg:flex gap-5 text-center">
                <div className="p-4  bg-purple-100 dark:bg-gray-800 dark:boder dark:border-gray-600 rounded-md">
                    <div className="flex justify-between">
                        <p className="text-purple-800 dark:text-white font-bold text-lg">
                            {topic['name']}
                        </p>
                        <div className="flex gap-4">
                            <TopicModal type={code} topic={topic}/>
                            <Delete name={topic['name']} res={handleDelete} />
                        </div>

                    </div>
                    <p className="text-gray-900 whitespace-nowrap dark:text-white p-1 bg-white dark:bg-gray-900 rounded-lg">
                        ID: {code}
                    </p>

                    <div className="mt-6">
                        <div className="flex justify-between">
                            <p className="text-purple-800 dark:text-white font-bold text-lg">
                                Nhóm món ăn
                            </p>
                            <FoodGroupModal
                            foodgroup={foodgroup}
                            tid={code}
                            getGid={(id: string) => setGid(id)} />
                        </div>

                        {foodgroup.length > 0 ?
                            <div className=" overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Tên nhóm
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Mã nhóm
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Chỉnh sửa
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foodgroup.map((item, i) => (
                                        <FGroupTable key={i} item={item} />))}
                                </tbody>
                            </table>
                        </div>
                        : <p className="text-center text-gray-500 font-semibold">Chưa có nhóm nào</p>}
                    </div>
                </div>
                <div className="lg:flex-1 lg:mt-0 mt-6">
                    {food.length > 0 ?
                        <List
                            title={foodgroup}
                            data={food}
                            type="food"
                            id={code} />
                        :  <p className="flex gap-5 text-center text-gray-500 font-semibold">
                                Bấm vào <AddButton type="food" id={code} />
                                để thêm món ăn
                            </p>}
                </div>
            </div>
        </div>
    );
};