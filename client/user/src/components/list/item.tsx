import React from "react";
import { Link } from "react-router-dom";
import { Rate } from 'antd';
import { Delete } from "../../components";

export default function Item({ name, image, tag, link, voted }: { name: string, image: string, tag: Array<string>, link: string, voted: number }) {
    return (
        <div className="flex justify-between rounded-md hover:bg-blue-200 dark:hover:bg-gray-800">
            <div className="flex-1">
                <Link to={`/${link}`}>
                    <div className="p-2 h-full  cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src={image} alt={name} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {name}
                                </p>
                                {tag && tag.map((t, i) => (
                                    <span key={i} className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {tag}
                                    </span>
                                ))}

                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {voted > 0 && <Rate allowHalf defaultValue={voted} />}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="p-2">
                <Delete/>
            </div>
        </div>
    )
}