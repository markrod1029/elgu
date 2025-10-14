import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Municipality A', Businesses: 400 },
  { name: 'Municipality B', Businesses: 300 },
  { name: 'Municipality C', Businesses: 200 },
  { name: 'Municipality D', Businesses: 278 },
  { name: 'Municipality E', Businesses: 189 },
];

const MunicipalityChart = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Businesses" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MunicipalityChart;