import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Registered', Active: 400, Inactive: 240 },
  { name: 'Verified', Verified: 300, Unverified: 139 },
];

const BusinessStatusChart = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Active" stackId="a" fill="#8884d8" />
          <Bar dataKey="Inactive" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Verified" stackId="b" fill="#ffc658" />
          <Bar dataKey="Unverified" stackId="b" fill="#d0ed57" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BusinessStatusChart;