import React from "react";
import { AccForm, BackButton } from "../../components";

export default function AccInfo() {
    return (
        <div className=''>
            <div className="fixed ml-5 mb-3">
                <BackButton />
            </div>
            <div className="flex">
                <AccForm/>
                <div className="text-gray-900 dark:text-white">
                    <div>
                        <p className="text-lg font-semibold">Món ăn yêu thích</p>
                        
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Lịch sử bình luận</p>
                    </div>
                </div>
            </div>
        </div>
    )
}