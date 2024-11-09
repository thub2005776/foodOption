import React, { useState } from 'react';
import { parseISO, isWithinInterval, isThisWeek, isThisMonth, isThisQuarter, isThisYear } from 'date-fns';
import { ImportCouponItem, OrderItem } from '../../components';

export default function FilteredDataComponent({data, type, selected, start, end}:
  {data:Array<Object>,type:string, selected:string,  start:string, end:string}) {
  const [filteredData, setFilteredData] = useState([{}]);
  

    const filtered = data.filter(item => {
      const createdAtDate = parseISO(item['createdAt']['$date']);

      // Điều kiện 1 tuần
      const withinWeek = isThisWeek(createdAtDate);
      
      // Điều kiện 1 tháng
      const withinMonth = isThisMonth(createdAtDate);

      // Điều kiện 3 tháng
      const withinQuarter = isThisQuarter(createdAtDate);

      // Điều kiện 1 năm
      const withinYear = isThisYear(createdAtDate);

      // Điều kiện từ ... đến ...
      const startDate = new Date(start);
      const endDate = new Date(end);
      const withinRange = isWithinInterval(createdAtDate, { start: startDate, end: endDate });
 
      // Lọc dữ liệu theo các điều kiện
      if (selected === '1 tuần') {
        return withinWeek
      } else if (selected === '1 tháng') {
        return withinMonth
      } else if (selected === '3 tháng') {
        return withinQuarter
      }  else if (selected === '1 năm') {
        return withinYear
      } else if (selected === 'option') {
        return withinRange
      } else {
        return data
      }
    });


  return (
    <tbody>
      {/* Hiển thị dữ liệu đã lọc */}
      {filtered.length > 0? filtered.map((item, i) => (
       type === 'importcoupon'? <ImportCouponItem item={item} key={i} />:
       type === 'order' &&  <OrderItem key={i} item={item} />
      ))
    : <p className='text-center text-gray-600 p-10'>Không tìm thấy kết quả phù hợp</p>}
    </tbody>
  );
};
