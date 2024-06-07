import React, { RefCallback, useState } from "react";

export default function TagBage({ name, cancel }: { name: string, cancel: RefCallback<Object> }) {
    const [check, setCheck] = useState(false);
    const handleCancel = () => {
        setCheck(!check)
        cancel({ "name": name, check: !check })
    }
    return (
        <span id="badge-dismiss-default" className={`${check? "text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300": "text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"}
        inline-flex items-center px-2 py-1 me-2 text-sm font-medium`}>
            {name}
            <button
                onClick={handleCancel}
                type="button"
                className={`${check ? "text-green-400 bg-transparent hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
                    : "text-blue-400 bg-transparent hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"} 
                    inline-flex items-center p-1 ms-2 text-sm rounded-sm data-dismiss-target="#badge-dismiss-default" aria-label="Remove`}>
                {check ?
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    : <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                    </svg>}
                <span className="sr-only">{name}</span>
            </button>
        </span>
    );
};