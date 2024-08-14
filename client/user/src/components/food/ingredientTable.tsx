import React from "react";

export default function IngredientTable({ recipe }: { recipe: Object }) {
    return (
        recipe &&
        <div className="relative overflow-x-auto mb-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nguyên liệu
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Liều lượng (g/ml/củ/quả...)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recipe['ingredients'].map((item: Object, i: React.Key) => (
                        <tr key={i} className="bg-white dark:bg-gray-800">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item['name']}
                            </th>
                            <td className="px-6 py-4">
                                {item['amount']}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};