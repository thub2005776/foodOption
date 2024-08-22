import React, { RefCallback } from "react";


export default function FGroupList({ foodGroup,  gid }: { foodGroup:Array<Object>,  gid: RefCallback<string> }) {
    
    return (
        foodGroup &&
        <div className="p-1 bg-blue-300 dark:bg-gray-700 rounded-md w-64">
            {Array.isArray(foodGroup)?
                <div>
                    {foodGroup.map((f: Object, i: React.Key) => (
                        <div onClick={() => gid(f['_id'].$oid)} key={i}
                            className="hover:bg-blue-400 dark:hover:bg-slate-500 p-2 rounded-md cursor-pointer">
                            <p className="text-gray-800 dark:text-white font-bold text-center">{f['name']}</p>
                            <p className="text-gray-600 dark:text-white">{f['_id'].$oid}</p>
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