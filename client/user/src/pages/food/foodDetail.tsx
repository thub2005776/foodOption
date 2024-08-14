import React, { useState } from "react";
import { Rate } from 'antd';
import { Comments, FavoritedButton, IngredientTable, ProcessingList, Rating, VideoPlayer } from "../../components";

export default function FoodDetail() {
    const [played, setPlayed] = useState(false);
    const [rating, setRating] = useState(5);

    const handlePlayed = () => {
        setPlayed(!played);
    }

    const handleRated = (num: number) => {
        setRating(num);
    }

    const handleLiked = (result:boolean) => {

    }
    return (
        <div>
            <div className="mx-5 lg:flex lg:justify-center gap-10">
            <div className="lg:block sm:flex gap-5">
                <div className="w-[40rem] h-96 mb-16">
                    {!played ?
                        <img className="w-[40rem] h-96 rounded-md"
                            src="https://i.pinimg.com/564x/eb/b3/51/ebb3515dc7cfa121b2a2571d12628cc5.jpg" alt="food"
                        />
                        : <VideoPlayer videoId="Ildv1ncLJig" />}
                    <div className="flex justify-between mt-3">
                        <div className="flex gap-5">
                            <div onClick={handlePlayed} className="p-1">
                                <svg className="w-8 h-8 cursor-pointer text-gray-600 dark:gray-600 hover:text-red-600 dark:hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clipRule="evenodd" />
                                </svg>
                            </div>
                           <div className="mt-2 p-1 rounded-md bg-gray-200 dark:bg-gray-700">
                           <Rate allowHalf defaultValue={rating} onChange={handleRated}/> 
                        </div>

                        <FavoritedButton liked={handleLiked} />
                        </div>
                        
                        
                        <Rating rate={4.45} amount={35} />
                    </div>
                </div>

                <div>
                    <dl className="w-64 lg:w-max lg:max-w-xl text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className=" flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                Phở gà
                            </dt>

                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                                Mô tả
                            </dt>
                            <dd className="text-sm font-semibold ">
                            Bạn chắc chắn sẽ không thể cưỡng lại món phở thơm ngọt nhiều dưỡng chất, 
                            kết hợp cùng bánh phở dai dai và nước dùng đậm đà, ăn kèm cùng một vài cọng rau thơm. 
                            Món ăn đặc trưng của Việt Nam này tưởng chừng phức tạp nhưng lại khá đơn giản trong cách chế biến.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="w-full">
                <h1 className="text-blue-700 dark:text-white font-bold text-center m-2">CÁCH CHẾ BIẾN</h1>
                <IngredientTable
                    recipe={
                        {
                            ingredients: [
                                { name: "Thịt gà", amount: "1 con" },
                                { name: "Phở khô", amount: "500g" },
                                { name: "Hành tây", amount: "1 củ" },
                                { name: "Rau ăn hành", amount: "Tuỳ khẩu vị" },
                                { name: "Gia vị", amount: "Tuỳ khẩu vị" }
                            ]
                        }
                    } />

                <ProcessingList
                    recipe={{
                        processing: [
                            {
                                step: 1,
                                content: "Rửa sạch gà và cho vào nồi lớn, đổ nước lạnh vào nồi, đun sôi và vớt bọt ra. Tiếp theo, rửa gà lại bằng nước sạch và đổ nước mới vào nồi. Gỡ lớp da gà bằng cách dùng dao cạo sát vào da và lột đi. Đun sôi nước trong nồi và cho gà vào, đun từ từ. Nặn lấy bọt ra và tiếp tục đun gà khoảng 30-40 phút cho đến khi gà chín mềm. Khi gà đã chín, vớt gà ra, để nguội và sau đó thái thành từng miếng nhỏ."
                            },
                            {
                                step: 2,
                                content: "Rửa sạch gà và cho vào nồi lớn, đổ nước lạnh vào nồi, đun sôi và vớt bọt ra. Tiếp theo, rửa gà lại bằng nước sạch và đổ nước mới vào nồi. Gỡ lớp da gà bằng cách dùng dao cạo sát vào da và lột đi. Đun sôi nước trong nồi và cho gà vào, đun từ từ. Nặn lấy bọt ra và tiếp tục đun gà khoảng 30-40 phút cho đến khi gà chín mềm. Khi gà đã chín, vớt gà ra, để nguội và sau đó thái thành từng miếng nhỏ."
                            },
                            {
                                step: 3,
                                content: "Rửa sạch gà và cho vào nồi lớn, đổ nước lạnh vào nồi, đun sôi và vớt bọt ra. Tiếp theo, rửa gà lại bằng nước sạch và đổ nước mới vào nồi. Gỡ lớp da gà bằng cách dùng dao cạo sát vào da và lột đi. Đun sôi nước trong nồi và cho gà vào, đun từ từ. Nặn lấy bọt ra và tiếp tục đun gà khoảng 30-40 phút cho đến khi gà chín mềm. Khi gà đã chín, vớt gà ra, để nguội và sau đó thái thành từng miếng nhỏ."
                            }

                        ]
                    }} />
            </div>
        </div>
        <Comments com={[{
            image: "https://i.pinimg.com/564x/0a/1f/39/0a1f391965cc20b2dc258bfc6db09705.jpg",
            username: "Bailu",
            date: "11:21",
            content: "Easy!!!"
        },
        {
            image: "https://i.pinimg.com/736x/b1/1c/6f/b11c6ff1267811c3f9b8a10bcbe45778.jpg",
            username: "Caixukun",
            date: "11:14",
            content: "Good!."
        }
        ]} />
        </div>
    )
}