import React from "react";
import { List } from '../../components'

export default function AccList() {
    return(
        <div>
            <List
                title={[]}
                data={[
                    {name:"Cai Xukun",
                        image:"https://i.pinimg.com/564x/3b/81/86/3b8186188b75e07dff705f1762bdd85e.jpg",
                        link:"acc/abc",
                    tag:["caixukun@gmail.com"],
                    voted: 0
                    },
                    {name:"Bai Mengyan",
                        image:"https://i.pinimg.com/736x/8e/a9/e9/8ea9e9f249b4dc61ed0c7ff523b3db7d.jpg",
                        link:"acc/abc",
                    tag:["baimengyan@gmail.com"],
                    voted: 0
                    }
                ]}
                type="acc"
            />
        </div>
    )
}