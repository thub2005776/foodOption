import React, { RefCallback } from "react";
import { useQuery } from "react-query";
import { getFoodGroupByTid } from "../../api/foodApi";


export default function FGroupList({ foodGroup, tid, gid }: { foodGroup:Array<Object>, tid: string, gid: RefCallback<string> }) {
    
    return (
        foodGroup &&
        <div className="p-1 bg-blue-300 dark:bg-gray-700 rounded-md w-64">
            {foodGroup.length > 0 ?
                <div>
                    {foodGroup.map((f: Object, i: React.Key) => (
                        <div onClick={() => gid(f['gid'])} key={i}
                            className="flex justify-between hover:bg-blue-400 dark:hover:bg-slate-500 p-2 rounded-md cursor-pointer">
                            <p className="text-gray-600 dark:text-white">{f['gid']}</p>
                            <p className="text-gray-600 dark:text-white">{f['name']}</p>
                        </div>
                    ))}
                </div>
                : <div>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                        Chưa có nhóm nào
                    </p>
                </div>}
        </div>
    )
}