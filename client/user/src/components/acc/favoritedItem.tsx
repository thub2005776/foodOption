import React from "react";
import { Delete, FoodCard } from "../../components";
import { useMutation } from "react-query";
import { deleteFavoritedFoodApi } from "../../api/favoritedFoodApi";
import { updateFoodApi } from "../../api/foodApi";

export default function FavoritedItem({ item }: { item: Object }) {
    const updatedFood = useMutation(
        updateFoodApi, {
        onSuccess(data, variables, context) {
            if (data === "successfull") {
                console.log(data);
            }
        }, onError(error, variables, context) {
            console.log(error);

        },
    }
    )

    const deleteFavorited = useMutation(
        deleteFavoritedFoodApi,{
            onSuccess(data, variables, context) {
                if (data === 'successfull') {
                    document.location.reload();
                }
            },onError(error, variables, context) {
                console.log(error);
            },
        }
    )

    const handleDeletedFavortied = (res:boolean) => {
        if (res) {
            
        const favoritedValue = {
            favorited: 1,
            operation: '-',
        }
            deleteFavorited.mutate(item['_id']['$oid']);
            updatedFood.mutate(favoritedValue);
        }
    }
    return (
        item &&
        <div className="relative">
            <div className="absolute top-3 right-1 z-10">
                <Delete name={item['food']['name']} action="Xoá" res={handleDeletedFavortied} />
            </div>
            <FoodCard food={item['food']} />
        </div>
    );
};