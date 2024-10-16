import React from "react";
import { Check } from "../../components"

export default function Orderes({ type, orderes }: { type: string, orderes: Array<Object> }) {
    const orderesFilter = orderes.filter(f => f['status'] === type || type === 'all');

    return (
        <div className="mx-10 m-2">
            {Array.isArray(orderesFilter) && orderesFilter.length > 0 ? orderesFilter.map((item, i) => (
                <Check item={item}/>
            ))
            : <p className="text-gray-600 text-center mt-28 h-56">Chưa có đơn hàng nào</p>}
        </div>
    );
};