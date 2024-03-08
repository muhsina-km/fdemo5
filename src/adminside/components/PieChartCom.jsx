import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PieChartCom = (props) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Dummy data for illustration, replace with actual data
  const data = [
    { name: 'Total', value: props.totalPlants || 0 },
    { name: 'AVAILABLE', value: props.AVAILABLECount || 0 },
    { name: 'UNAVAILABLE', value: props.UNAVAILABLECount || 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartCom;
