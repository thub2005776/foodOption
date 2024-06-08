import React, { useState } from "react";
import FoodGroupItem from "./foodGroupItem.tsx";
import { FoodGroupModal, SearchModal } from "../../components";
import { useQuery } from "react-query";
import { getFoodGroup } from "../../api/foodApi.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice.js";

export default function FoodGroupList() {
    const auth = useSelector(selectUser);
    const { data: foodGroup} = useQuery('foodGroup', getFoodGroup)

    return (
        auth && foodGroup &&
        <div>
            <div className="flex gap-4">
                <SearchModal />
                <FoodGroupModal />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1">
                {foodGroup.map((element: Object, i:React.Key) => (
                    <FoodGroupItem key={i} link={element['_id'].$oid} title={element['name']} />
                ))}
            </div>
        </div>
    )
}
