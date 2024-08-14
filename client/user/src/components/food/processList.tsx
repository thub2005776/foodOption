import React from "react";

export default function ProccessingList({recipe}:{recipe:Object}) {
    return (
        recipe &&
        <ul className=" w-full ">
            {recipe['processing'].map((item:object, i:React.Key) => (
                <li key={i} className="flex items-center mb-3 text-gray-500 dark:text-gray-400 space-x-2.5">
                <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                    {item['step']}
                </span>
                <span>
                    <p className="text-sm">{item['content']}</p>
                </span>
            </li>
            ))}
        </ul>
    );
};