import React from "react";
import { BackButton } from "../../components";

export default function FoodForm() {
    return (
        <div className=''>
            <div className="fixed ml-5 mb-3">
                <BackButton />
            </div>

            <form className="flex gap-5 mx-24 dark:bg-gray-800 p-4 rounded-md">
                <div className="">
                    <img className="w-64 lg:w-96 rounded-lg"
                        src="https://i.pinimg.com/564x/3d/91/4c/3d914cca72ab50704c7877f401524b02.jpg" alt="" />

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-64 h-64 lg:w-96 lg:h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept="image/*" />
                        </label>
                    </div>

                </div>

                <div className="w-2/3">
                    <div className="mb-5">
                        <label htmlFor="drive" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Link Google Drive
                        </label>
                        <input type="drive" id="drive" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tên món ăn
                        </label>
                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="introduce" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Giới thiệu sơ lược
                        </label>
                        <textarea id="introduce"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >

                        </textarea>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="video" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Link Video
                        </label>
                        <input type="text" id="video" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tag
                        </label>
                        <input type="text" id="tag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="nutri" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Giá trị dinh dưỡng
                        </label>
                        <textarea id="nutri" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >

                        </textarea>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Submit
                    </button>
                </div>

            </form>
        </div>
    );
};