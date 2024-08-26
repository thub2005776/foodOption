import React from "react";
import FoodGroupItem from "./foodGroupItem.tsx";
import { TopicModal, SearchModal } from "../index.js";
import { useQuery } from "react-query";
import { getTopic } from "../../api/foodApi.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice.js";

export default function FoodGroupList() {
    const auth = useSelector(selectUser);
    const { data: topics} = useQuery('topics', getTopic)

    return (
        auth && topics &&
        <div>
            <div className="flex gap-4">
                <SearchModal />
                <TopicModal type="add" topic={{}}/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1">
                { topics.map((element: Object, i:React.Key) => (
                    <FoodGroupItem key={i} link={element['_id'].$oid} title={element['name']} />
                ))}
            </div>
        </div>
    )
}
