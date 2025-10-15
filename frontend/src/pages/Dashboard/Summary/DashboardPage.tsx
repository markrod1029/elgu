import TotalBusinessChart from '@/components/molecules/charts/pieChart';
import MonthlyBusinessComparisonChart from '@/components/molecules/charts/lineChart';
import BusinessStatusChart from '@/components/molecules/charts/stackBarChart';
import MunicipalityChart from '@/components/molecules/charts/horizontalBarChart';

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Total Businesses</h2>
          <TotalBusinessChart />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Monthly Business Comparison</h2>
          <MonthlyBusinessComparisonChart />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Business Status</h2>
          <BusinessStatusChart />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Businesses by Municipality</h2>
          <MunicipalityChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;