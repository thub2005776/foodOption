import React from "react";
import { CommItem } from '../../components';

export default function CommList() {
    return(
        <div>
            <CommItem
                user={{image:"https://i.pinimg.com/564x/41/ca/2e/41ca2e913dd0971fc2220c624ba2c5fa.jpg"}}
                com={{content:"That's awesome. I think our users will really appreciate the improvements."}}
            />
             <CommItem
                user={{image:"https://i.pinimg.com/564x/41/ca/2e/41ca2e913dd0971fc2220c624ba2c5fa.jpg"}}
                com={{content:"That's awesome. I think our users will really appreciate the improvements."}}
            />
        </div>
    )
}