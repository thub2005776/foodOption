import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Food, Review } from "../../components";
import axios from "axios";
import { useQuery } from "react-query";
import { getReviewByFIdApi } from "../../api/reviewApi";



export default function FoodDetail() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const {data: reviews} = useQuery(`${id}reviews`, () => getReviewByFIdApi(id));

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
    
      console.log(reviews);
      
    return (
        food && reviews &&
        <div className="lg:mx-20 mx-10">
           <Food food={food} />
           <div>
            <p className="text-gray-900 dark:text-white font-semibold mb-6 text-xl">Đánh giá của khách hàng</p>
             {Array.isArray(reviews) && reviews.length > 0? reviews.map((item, i) => (
                <Review key={i} item={item} />
            )): <p className="text-center m-10 p-6 text-gray-600">Chưa có đánh giá nào</p>}
           </div>
        </div>
    )
}