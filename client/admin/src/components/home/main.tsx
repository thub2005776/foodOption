import React from "react";
import { List } from "../../components";

export default function Main() {
    return (
        <div className=" lg:flex justify-center gap-4 ">
            <List
                title={["Top món ăn nổi bật", "Top món ăn đánhh giá thấp"]}
                data={[
                    {name:"Trà trái cây",
                        image:"https://i.pinimg.com/564x/cf/07/ad/cf07adc972f34f9d0e0c74bc7ca412fc.jpg",
                        link:"abc",
                    tag:['Giải nhiệt, đồ uống'],
                    voted:4.5
                    },
                    {name:"Trà sữa",
                        image:"https://i.pinimg.com/564x/cf/07/ad/cf07adc972f34f9d0e0c74bc7ca412fc.jpg",
                        link:"abc",
                    tag:['Giải nhiệt, đồ uống'],
                    voted:4.0
                    }
                ]}
                type="food"
            />
            <List
                title={["Xu hướng", "Lỗi thời"]}
                data={[
                    {name:"Trà đào",
                        image:"https://i.pinimg.com/564x/cf/07/ad/cf07adc972f34f9d0e0c74bc7ca412fc.jpg",
                        link:"abc",
                    tag:['Giải nhiệt, đồ uống'],
                    voted:3.0
                    },
                    {name:"Trà long nhãn",
                        image:"https://i.pinimg.com/564x/cf/07/ad/cf07adc972f34f9d0e0c74bc7ca412fc.jpg",
                        link:"abc",
                    tag:['Giải nhiệt, đồ uống'],
                    voted:2.5
                    }
                ]}
                type="food"
            />
        </div>
    )
}