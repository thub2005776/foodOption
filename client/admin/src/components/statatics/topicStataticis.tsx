import React from "react";
import { ChartFilter } from "..";

export default function TopicStatatics({id, food}:{id:string, food:Object}) {
    
    return(
        food && 
        <div>
            <ChartFilter type="food" 
            stataticsByDay={[food]}
            stataticsByWeek={[food]}
            stataticsByMonth={[food]}
            stataticsByQuarter={[food]}
            stataticsByYear={[food]}
            />
        </div>
    );
};