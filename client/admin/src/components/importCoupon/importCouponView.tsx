import React from "react";
import { DateTimeDisplay } from "../../components";
import { Link } from "react-router-dom";

export default function ImptView({type, impt }: {type:string, impt: Object }) {
    return (
        impt &&
        <Link to={`/${type}/${impt['_id']['$oid']}`}>
            <div className="p-2 mb-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <div className="font-medium text-gray-900 dark:text-white flex gap-1">
                    <p>Thời gian </p>
                    <DateTimeDisplay datetime={impt['updatedAt']} />
                </div>
                <div className="font-medium text-gray-900 dark:text-white flex gap-5">
                    <p>ID:</p>
                    {impt['_id']['$oid']}
                </div>
            </div>
        </Link>
    );
};