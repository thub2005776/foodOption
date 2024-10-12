import React from "react";

export default function Status({ status }: { status: string }) {
    return (
        <p className="mb-6 text-gray-900 dark:text-white font-semibold">

            {status === "processing" &&
                <span className="bg-blue-100 text-blue-800  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      Đang xử lý
                </span>
            }

            {status === "preparing" &&
                <span className="bg-indigo-100 text-indigo-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                    Đang chuẩn bị
                </span>
            }

            {status === "delivering" &&
                <span className="bg-yellow-100 text-yellow-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                    Đang giao
                </span>
            }
            {status === "completed" &&
                <span className="bg-green-100 text-green-800  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Hoàn thành
                </span>
            }
            
            {status === "canceled" &&
                <span className="bg-red-100 text-red-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Đã huỷ
                </span>
            }
        </p>
    );
};