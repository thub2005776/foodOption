import React from "react";
import { List } from '../../components';

export default function FoodList() {
    return(
        <div>
            <p></p>
            <List
                title={["Món chính", "Đồ uống", "Ăn vặt"]}
                data={[
                    {name:"Trà trái cây",
                        image:"https://i.pinimg.com/564x/cf/07/ad/cf07adc972f34f9d0e0c74bc7ca412fc.jpg",
                        link:"food/abc",
                    tag:['Giải nhiệt, đồ uống'],
                    voted:4.5
                    },
                    {name:"Trà sữa",
                        image:"https://i.pinimg.com/564x/cf/07/ad/cf07adc972f34f9d0e0c74bc7ca412fc.jpg",
                        link:"food/abc",
                    tag:['Giải nhiệt, đồ uống'],
                    voted: 4.0
                    }
                ]}
                type="food"
            />
        </div>
    )
}