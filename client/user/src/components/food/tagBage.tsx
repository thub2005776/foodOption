import React from "react";

export default function TagBage({ name }: { name: string}) {

    return (
        <span 
        className={`"text-blue-800 bg-blue-100 rounded  dark:text-white dark:bg-blue-900"}
        inline-flex items-center px-2 py-1 me-2 text-sm font-medium`}>
            {name}
        </span>
    );
};