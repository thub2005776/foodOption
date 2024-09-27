import React from 'react';
import { FoodCard } from '../../components';

export default function TopSeller() {
    return (
        <div>
            <div className="ms-5 flex gap-2">

                <FoodCard food={{
                    name: "abc",
                    rating: '3.5',
                    price: '25.000'
                }} />
                <FoodCard food={{
                    name: "abc",
                    rating: '3.5',
                    price: '25.000'
                }} />
            </div>
        </div>
    )
}