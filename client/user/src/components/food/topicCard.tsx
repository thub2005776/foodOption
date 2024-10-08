import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { downloadApi } from "../../api/uploadFileApi";

export default function TopicCard({ topic }: { topic: Object }) {
    const { data: imageFile } = useQuery(topic['image'] ? topic['_id'].$oid : 'topicImage', () => downloadApi(topic['image'] ? topic['image'] : 'food.jpg'));

    return (
        topic && imageFile &&
        <Link to={`/topic/${topic['_id'].$oid}`}
            onClick={() => URL.revokeObjectURL(imageFile)}>
            <div className="flex flex-col items-center">
                <div className="block w-fit p-2 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <img src={imageFile instanceof Blob ? URL.createObjectURL(imageFile)
                        : "https://i.pinimg.com/564x/cc/8f/c4/cc8fc478998813c1e26d4a64c8b9760f.jpg"
                    } alt="topic"
                        className="w-72 h-44" />
                </div>
                <h5 className="m-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {topic['name']}
                </h5>
            </div>
        </Link>


    );
};