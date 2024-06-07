import React from "react";
import { useLocation } from "react-router-dom";
import { BackButton, FoodList, ForwardButton } from "../../components";

export default function FoodGroupItems() {
    const location = useLocation();
    const code = location.pathname.split('/')[2];
    

    return (
        <div className="h-screen dark:text-white mx-5 lg:mx-32">
            <div className="flex  gap-4 mb-6">
                <BackButton/>
                <ForwardButton/>
            </div>
            <FoodList />
        </div>
    );
};