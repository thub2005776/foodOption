import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getFoodByIdApi } from "../../api/foodApi";
import { Comments, Food } from "../../components";
import axios from "axios";



export default function FoodDetail() {
    
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    // const { data: food } = useQuery(id, () => getFoodByIdApi(id));
    const [rating, setRating] = useState(0);

    const [food, setFood] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/api/food/${id}`)
          .then(res => {
            setFood(res.data)
          })
          .catch(err => {
            console.log(err);
          })
      }, [])

    const handleRated = (num: number) => {
        setRating(num);
    }
    
    return (
        food && 
        <div className="lg:mx-20 mx-10">
           <Food food={food} />

            <div>
                {/* <dt className="my-7 text-gray-900 text-3xl font-bold dark:text-white">
                    Đánh giá của khách hàng
                </dt>
                <p className="mb-10 text-lg dark:text-white font-semibold">Đánh giá:
                    <span className="ms-5 p-1 rounded-md bg-gray-200 dark:bg-gray-700">
                        <Rate allowHalf defaultValue={rating} onChange={handleRated} />
                    </span>
                </p> */}


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
        </div>
    )
}