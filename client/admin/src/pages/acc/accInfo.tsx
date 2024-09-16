import React from "react";
import {  Comments, FoodCard } from "../../components";
import { AccForm } from "../../pages";

export default function AccInfo() {
    
    return (
        <div className='mx-10'>
            <div className="">
                <AccForm />
                <div className="text-gray-900 dark:text-white">
                    <div>
                        <p className="text-lg font-semibold">Món ăn yêu thích</p>
                        <FoodCard />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Lịch sử bình luận</p>
                        <Comments/>
                    </div>
                </div>
            </div>
        </div>
    )
}