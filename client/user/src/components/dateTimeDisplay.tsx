import React from "react";

export default function DateTimeDisplay({datetime}:{datetime:string}) {
    // Xử lý chuỗi để bỏ phần timezone (GMT+0700)
    const dateStrWithoutTimeZone = datetime.split('GMT')[0].trim();
    
    // Chuyển đổi chuỗi thành đối tượng Date
    const date = new Date(dateStrWithoutTimeZone);
    
    // Định dạng ngày giờ
    const formattedDate = date.toLocaleString('vn-Vi', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    return(
        <span> {formattedDate}</span>
    );
};