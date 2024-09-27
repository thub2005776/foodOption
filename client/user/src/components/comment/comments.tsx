import React from "react";
import { CommentInput } from '../../components'

export default function Comments({ com }: { com: Array<Object> }) {
    return (
        com &&
        <div className="">
            <p className="text-lg font-semibold text-gray-800 dark:text-white mb-6">{com.length} Bình luận</p>
            <CommentInput />
            {com.map((item: Object, i: React.Key) => (
                <div key={i} className="flex items-start gap-2.5 mb-6">
                    <img 
                    className="w-8 h-8 rounded-full" 
                    src={item['image']} alt="image" />
                    <div className="flex flex-col w-fit leading-1.5">
                        <div className="flex items-center gap-5">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {item['username']}
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                {item['date']}
                            </span>
                        </div>
                        <p className="text-sm font-normal p-2 text-gray-900 dark:text-white bg-blue-200 dark:bg-gray-700 rounded-md">
                            {item['content']}
                        </p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            reply
                        </span>
                    </div>
                </div>))}
        </div>
    );
};