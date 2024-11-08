import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DatasetType} from '@mui/x-charts/internals';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

export default function BasicBars({ dataset, type }:
  {
    dataset: DatasetType,
    type: string
  }) {

    const chartSetting = {
      yAxis: [
        {
          label: 'VND',
        },
      ],
      width:type === 'year'? 800:600,
      height:type ==='year'?500:400,
      sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-50px, 0)',
        },
      },
    };
    

   const valueFormatter = (value: number | null) => {
      return `${value}đ`;
    }
  
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'start'}]}
      series={[
        { dataKey: 'profit', label: 'Doanh thu', valueFormatter },
        { dataKey: 'order_total', label: 'Đơn hàng', valueFormatter },
        { dataKey: 'impt_total', label: 'Nhập hàng', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}