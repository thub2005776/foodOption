import React, { RefCallback, useState } from "react";

export default function Delete({ name, res }: { name: string, res: RefCallback<boolean> }) {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
        res(false);
    }

    const handleDelete = () => {
        setOpenModal(false);
        res(true);
    }
    return (
        <div>
            <button
                onClick={() => setOpenModal(true)}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Xoá
            </button>

            {openModal &&
                <div id="popup-modal" className="bg-gray-100 z-[5000] justify-center items-center">
                    <div className="fixed top-20 lg:top-32 right-0 left-[10%] sm:left-[30%] lg:left-[40%] p-4 w-full max-w-md max-h-full ">
                        <div className="relative bg-red-200 rounded-lg shadow dark:bg-gray-900 dark:border dark:border-gray-600">
                            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"
                                onClick={onCloseModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-red-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Bạn chắc chắn muốn xoá "{name}"?
                                </h3>
                                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                    onClick={handleDelete}>
                                    Xoá
                                </button>
                                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={onCloseModal}>Huỷ</button>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}