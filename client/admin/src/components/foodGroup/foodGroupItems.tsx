import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton, Delete, List, TopicModal } from "../../components";
import { deleteTopicApi, getFoodByTopicIdApi, getTopicById } from "../../api/foodApi";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function FoodGroupItems() {
    const auth = useSelector(selectUser);
    const location = useLocation();
    const code = location.pathname.split('/')[2];
    const { data: topic } = useQuery('topic', () => getTopicById(code));
    const { data: food } = useQuery('food', () => getFoodByTopicIdApi(code))
    const deleteTopic = useMutation(deleteTopicApi);
    const navigate = useNavigate()

    const handleDelete = (res: boolean) => {
        if (res) {
            deleteTopic.mutate(code, {
                onSuccess: (data) => {
                    if (data === "successfull") {
                        navigate('/admin/tab2')
                    } else { alert(data) }
                },
                onError(error) {
                    alert(error)
                },
            })
        }
    }

    return (
        auth && topic && food &&
        <div className="h-screen dark:text-white mx-5 lg:mx-32">
            <div className="flex  gap-4 mb-6">
                <BackButton />
            </div>
            <div className="flex gap-5 text-center">
                <div className="p-4 h-20 bg-purple-100 dark:bg-gray-800 dark:boder dark:border-gray-600 rounded-md">
                    <div className="flex justify-between">
                        <p className="text-purple-800 dark:text-white font-bold text-lg">
                            {topic['name']}
                        </p>
                        <div className="flex gap-4">
                            <TopicModal type={code} />
                            <Delete name={topic['name']} res={handleDelete} />
                        </div>

                    </div>
                    <p className="text-gray-600">
                        ID: {code}
                    </p>
                </div>
                <div className="flex-1">
                    {food.length > 0?
                     <List
                        title={["Món chính", "Đồ uống", "Ăn vặt"]}
                        data={food}
                        type="food"
                        id={code} />
                    :<p className="text-center text-gray-500 font-semibold">Chưa có món ăn nào</p>}
                </div>

            </div>
        </div>
    );
};