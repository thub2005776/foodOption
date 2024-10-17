import React from "react";

export default function Address({ address }: { address: Object }) {

    return (
        <div className="shadow-sm m-6 p-4">
            <div>
                <p className="text-gray-900 dark:text-white font-bold">{address['username']} |
                    <span className="text-gray-600 font-bold">(+84) {address['phone']}</span>
                </p>
            </div>
            <div className="flex justify-between">
                <div>
                    <p className="text-gray-600">{address['address']}</p>
                    <p className="text-green-500 ">
                        {address['actived'] ? 'Mặc định' : ''}
                    </p>
                </div>
            </div>
        </div>
    )
}