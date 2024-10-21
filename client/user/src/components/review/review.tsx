import React, { useState } from "react";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";
import { DateTimeDisplay } from "../../components";

export default function Review({ item }: { item: Object }) {
    const { data: imageFile } = useQuery(item['user'] ? item['user']['_id']['$oid'] : 'userimage',
        () => downloadApi(item['user'] ? item['user']['image'] : 'avatar.jpg'))

    return (
        item && imageFile instanceof Blob &&
        <div className="flex items-start gap-2.5">
            <img className="w-8 h-8 rounded-full" src={URL.createObjectURL(imageFile)} alt="user" />
            <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item['user']['name']}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"><DateTimeDisplay datetime={item['updatedAt']} /></span>
                </div>
                <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">{item['comment']}</p>
            </div>
        </div>
    );
};