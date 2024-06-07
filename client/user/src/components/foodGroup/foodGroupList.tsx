import React from "react";
import FoodGroupItem from "./foodGroupItem.tsx";
import { FoodGroupModal, SearchModal } from "../../components";

export default function FoodGroupList() {
    return (
        <div>
            <div className="flex gap-4">
                <SearchModal />
                <FoodGroupModal />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1">
                <FoodGroupItem link={'o00'} title={'Giải nhiệt'} />
                <FoodGroupItem link={'m00'} title={'Giữ ấm'} />
                <FoodGroupItem link={'n00'} title={'Miền Nam'} />
                <FoodGroupItem link={'b00'} title={'Miền Bắc'} />
            </div>
        </div>
    )
}
