import React from "react";

export default function Status({ status }: { status: Array<Object> }) {
    const statusName = Array.isArray(status) && status[status.length-1]['status'];

    return (
        status &&
        <p className="mb-6 text-gray-900 dark:text-white font-semibold">
            Trạng thái

            {statusName === "pending" &&
                <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    chờ duyệt
                </span>}
            
            {statusName === "processing" &&
                <span className="bg-blue-100 text-blue-800  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    Đang xử lý
                </span>
            }

            {statusName === "preparing" &&
                <span className="bg-indigo-100 text-indigo-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                    Đang chuẩn bị
                </span>
            }

            {statusName === "delivering" &&
                <span className="bg-yellow-100 text-yellow-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                    Đang giao
                </span>
            }
            {statusName === "delivered" &&
                <span className="bg-green-100 text-green-800  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Đã giao
                </span>
            }

            {statusName === "canceled" &&
                <span className="bg-red-100 text-red-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Đã huỷ
                </span>
            }
        </p>
    );
};