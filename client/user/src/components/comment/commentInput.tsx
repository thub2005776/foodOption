import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function CommentInput() {
    const user = useSelector(selectUser);
    return (

        <form className="max-w-md flex gap-5 mb-6">
            {
                <img
                    className="w-8 h-8 rounded-full"
                    src={'https://i.pinimg.com/736x/98/a6/2e/98a62ea62ce91ab255149ae6bba733b1.jpg'} alt="image" />}

            <input
                type="text"
                name="floating_text"
                id="floating_text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Viết bình luận" />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Send
            </button>
        </form>
    );
};