import React from "react";

export default function CartItem({ item }: { item: Object }) {
    const image = 'https:i.pinimg.com/564x/62/b0/58/62b05832fae87fdabf74517176f30c1f.jpg'
    return (
        item &&
        <div className="relative w-full shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th>
                            <img
                                className="w-32 rounded-md"
                                src={image} alt="food" />
                        </th>
                        <th className=" font-bold text-xl text-gray-900 whitespace-nowrap dark:text-white">
                            Bánh tráng trộn
                        </th>
                        <td className="px-6 py-4 font-semibold text-red-700 dark:text-red-400">
                            25.000đ
                        </td>
                        <td className="px-6 py-4">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Ghi chú
                            </label>
                            <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Thêm ghi chú..."></textarea>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-5 h-fit">
                                <div className="p-1 rounded-md border border-orange-500 dark:border-orange-400">
                                    <svg className="w-6 h-6 text-orange-500" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                                    </svg>
                                </div>
                                <p className="text-gray-900 dark:text-white font-bold text-lg">1</p>
                                <div className="p-1 rounded-md bg-orange-500 dark:bg-orange-400">
                                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                    </svg>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};