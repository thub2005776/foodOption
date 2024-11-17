import React from "react";

export default function DateTimeDisplay({datetime}:{datetime:string}) {
    const date = new Date(datetime)  

    // Định dạng ngày giờ
    const formattedDate = datetime.slice(11, 19) + ' ' + date.toLocaleDateString()
    return(
        <span> {formattedDate}</span>
    );
};