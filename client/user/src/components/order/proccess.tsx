import React from 'react'
import { DateTimeDisplay } from '../../components';

export default function Proccess({ status }: { status: Array<Object> }) {

    return (
        status &&
        <ol className="flex justify-center items-center mb-6 w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
            {Array.isArray(status) && status.map((item, i) => (
                <li key={i} className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
                    <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                        {i + 1}
                    </span>
                    <span>
                        <h3 className="font-medium leading-tight">{String(item['status']).toLocaleUpperCase()}</h3>
                        <DateTimeDisplay datetime={item['time']} />
                    </span>
                </li>
            ))}
        </ol>
    );
};