import React from "react";
import { Link } from "react-router-dom";

export default function FoodGroupItem({ link, title }: { link: String, title: String }) {
    return (
        <Link to={`/foodgroup/${link}`} className="relative inline-flex items-center justify-center rounded-md group bg-[#ebd7fa] dark:bg-[#ab7ae0] hover:bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <p className="p-4 text-lg font-semibold hover:text-white text-gray-400 dark:text-white text-center">
                {title}
            </p>
        </Link>
    )
}