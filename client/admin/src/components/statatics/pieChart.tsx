import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { MakeOptional } from '@mui/x-charts/internals';
import { PieValueType } from '@mui/x-charts';

export default function BasicPie({data}:{data:MakeOptional<PieValueType, "id">[]}) {
  return (
    <PieChart
      series={[
        {
          data: data,
        },
      ]}
      width={400}
      height={200}
    />
  );
}