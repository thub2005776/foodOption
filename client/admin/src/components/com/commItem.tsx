import React, { useState } from "react";
import { Delete, Reply } from "../../components";

export default function CommItem({user, com}:{user:Object, com:Object}) {

    const DeletedComment = (res:boolean) => {

    } 
    return (
        <div>
            <div className="flex items-start gap-2.5">
                <img className="w-8 h-8 rounded-full" src={user['image']} alt="image"/>
                    <div className="flex flex-col gap-1 w-full max-w-[320px]">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white"
                            >Bonnie Green
                            </span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"
                            >11:46
                            </span>
                        </div>
                        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <p className="text-sm font-normal text-gray-900 dark:text-white">
                                {com['content']}
                            </p>
                        </div>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400"
                        >Chưa phản hồi
                        </span>
                    </div>
                    <div className="flex mt-10">
                        <Reply/>
                        <Delete name="com" res={DeletedComment}/>
                    </div>
                    
            </div>

        </div>
    )
}