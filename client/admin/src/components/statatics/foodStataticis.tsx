import React from "react";
import { useQuery } from "react-query";
import { getFoodStataticsApi, getFoodStataticsByTimeApi } from "../../api/stataticsApi";
import { ChartFilter } from "../../components";

export default function FoodStatatics({id, food}:{id:string, food:Object}) {
    const {data:stataticsByDay} = useQuery('stataticsFByDay', () => getFoodStataticsByTimeApi(id, 'day'));
    const {data:stataticsByWeek} = useQuery('stataticsFByWeek', () => getFoodStataticsApi(id, 'week'));
    const {data:stataticsByMonth} = useQuery('stataticsFByMonth', () => getFoodStataticsApi(id, 'month'));
    const {data:stataticsByQuarter} = useQuery('stataticsFByQuarter', () => getFoodStataticsApi(id, 'quarter'));
    const {data:stataticsByYear} = useQuery('stataticsFByYear', () => getFoodStataticsApi(id, 'year'));

    console.log(stataticsByDay);
    
    return(
        food && Array.isArray(stataticsByDay) &&
        Array.isArray(stataticsByWeek) &&
        Array.isArray(stataticsByMonth) &&
        Array.isArray(stataticsByQuarter) &&
        Array.isArray(stataticsByYear) &&
        <div>
            <ChartFilter type="food" 
            stataticsByDay={stataticsByDay}
            stataticsByWeek={stataticsByWeek}
            stataticsByMonth={stataticsByMonth}
            stataticsByQuarter={stataticsByQuarter}
            stataticsByYear={stataticsByYear}
            />
        </div>
    );
};