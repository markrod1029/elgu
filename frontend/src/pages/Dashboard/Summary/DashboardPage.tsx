import { useState, useEffect } from 'react';
import TotalBusinessChart from '@/components/molecules/charts/pieChart';
import MonthlyBusinessComparisonChart from '@/components/molecules/charts/lineChart';
import BusinessStatusChart from '@/components/molecules/charts/stackBarChart';
import MunicipalityChart from '@/components/molecules/charts/horizontalBarChart';
import { Building, CheckCircle, Clock, XCircle, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { Typography } from '@/components/atoms/typography';

interface DashboardStats {
  totalBusinesses: number;
  compliantBusinesses: number;
  pendingBusinesses: number;
  nonCompliantBusinesses: number;
  municipalities: number;
  growthRate: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBusinesses: 0,
    compliantBusinesses: 0,
    pendingBusinesses: 0,
    nonCompliantBusinesses: 0,
    municipalities: 0,
    growthRate: 0
  });
  const [loading, setLoading] = useState(true);

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Simulate API call
      setTimeout(() => {
        setStats({
          totalBusinesses: 156,
          compliantBusinesses: 89,
          pendingBusinesses: 42,
          nonCompliantBusinesses: 25,
          municipalities: 12,
          growthRate: 12.5
        });
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg p-6 h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const complianceRate = (stats.compliantBusinesses / stats.totalBusinesses) * 100;
  const nonComplianceRate = (stats.nonCompliantBusinesses / stats.totalBusinesses) * 100;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Business Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Total Businesses Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>

              <Typography as="p" variant="small" weight="medium" className="text-gray-600 mb-2">
                Total Businesses
              </Typography>
              <Typography as="p" variant="h2" weight="bold" className="text-blue-800">
                {stats.totalBusinesses}
              </Typography>

            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {stats.growthRate >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1 text-red-600" />
            )}
            <Typography as="span" className={stats.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}>
              {stats.growthRate >= 0 ? '+' : ''}{stats.growthRate}% from last month
            </Typography>

          </div>
        </div>

        {/* Compliant Businesses Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <Typography as="p" variant="small" weight="medium" className="text-gray-600 mb-2">
                Compliant
              </Typography>
              <Typography as="p" variant="h2" weight="bold" className="text-green-600">
                {stats.compliantBusinesses}
              </Typography>

            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <Typography as="p" variant="small" lassName="text-gray-600">
              {complianceRate.toFixed(1)}% of total
            </Typography>
          </div>
        </div>

        {/* Pending Businesses Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <Typography as="p" variant="small" weight="medium" className="text-gray-600 mb-2">
                Pending
              </Typography>
              <Typography as="p" variant="h2" weight="bold" className="text-yellow-600">
                {stats.pendingBusinesses}
              </Typography>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <Typography as="p" variant="small" lassName="text-gray-600">
              {((stats.pendingBusinesses / stats.totalBusinesses) * 100).toFixed(1)}% of total
            </Typography>
          </div>
        </div>

        {/* Non-Compliant Businesses Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <Typography as="p" variant="small" weight="medium" className="text-gray-600 mb-2">
                Non-Compliant
              </Typography>
              <Typography as="p" variant="h2" weight="bold" className="text-red-600">
                {stats.nonCompliantBusinesses}
              </Typography>

            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <Typography as="p" variant="small" lassName="text-gray-600">
              {nonComplianceRate.toFixed(1)}% of total
            </Typography>
          </div>
        </div>

        {/* Municipalities Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <Typography as="p" variant="small" weight="medium" className="text-gray-600 mb-2">
                Municipalities
              </Typography>
              <Typography as="p" variant="h2" weight="bold" className="text-purple-600">
                {stats.municipalities}
              </Typography>

            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <Typography as="p" variant="small" lassName="text-gray-600">
              Coverage area
            </Typography>
          </div>
        </div>
      </div>

      {/* Charts Section - Single Column Layout */}
      <div className="space-y-8">
        {/* Row 1: Total Business Distribution and Business Compliance Status (2 columns on large screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Total Business Distribution - 50% width */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <Typography as="h2" variant="h4" weight="semibold" className="mb-4 text-gray-800">
              Total Business Distribution
            </Typography>
            <div className="w-full h-80">
              <TotalBusinessChart />
            </div>
          </div>

          {/* Business Compliance Status - 50% width */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <Typography as="h2" variant="h4" weight="semibold" className="mb-4 text-gray-800">
              Business Compliance Status
            </Typography>
            <div className="w-full h-80">
              <BusinessStatusChart />
            </div>
          </div>
        </div>

        {/* Row 2: Monthly Business Trends and Businesses by Municipality (1 column on large screens) */}
        <div className="space-y-8">
          {/* Monthly Business Trends - 100% width */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <Typography as="h2" variant="h4" weight="semibold" className="mb-4 text-gray-800">
              Monthly Business Trends
            </Typography>
            <div className="w-full h-80">
              <MonthlyBusinessComparisonChart />
            </div>
          </div>

          {/* Businesses by Municipality - 100% width */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <Typography as="h2" variant="h4" weight="semibold" className="mb-4 text-gray-800">
              Businesses by Municipality
            </Typography>
            <div className="w-full h-80">
              <MunicipalityChart />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg border border-gray-200 p-6">
        <Typography as="h2" variant="large" weight="semibold" className="mb-4 text-gray-800">
          Performance Summary
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <Typography as="div" variant="h3" weight="bold" className="text-blue-600">
              {stats.totalBusinesses}
            </Typography>

            <Typography as="div" className="text-gray-600">
              Total Registered
            </Typography>

          </div>
          <div className="text-center">
            <Typography as="div" variant="h3" weight="bold" className="text-green-600">
              {complianceRate.toFixed(0)}%
            </Typography>

            <Typography as="div" className="text-gray-600">
              Compliance Rate
            </Typography>

          </div>
          <div className="text-center">

            <Typography as="div" variant="h3" weight="bold" className="text-yellow-600">
              {stats.pendingBusinesses}
            </Typography>

            <Typography as="div" className="text-gray-600">
              Need Attention
            </Typography>

          </div>
          <div className="text-center">
            <Typography as="div" variant="h3" weight="bold" className="text-red-600">
              {nonComplianceRate.toFixed(0)}%
            </Typography>

            <Typography as="div" className="text-gray-600">
              Non-Compliant
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;