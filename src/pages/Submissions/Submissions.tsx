import * as React from "react";
import {
  Users,
  Monitor,
  LineChart,
} from "lucide-react";
import Container from "@/components/submissions/container";

const Submissions: React.FunctionComponent = () => {
  return (
    <div
      className="p-2
    bg-gray-100 min-h-screen"
    >
      {/* Dashboard Cards */}
      <div className="flex w-full gap-[12px] mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow w-full h-[100px] flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="text-sm font-medium text-gray-600 mb-1">
              Total Submissions
            </h2>
            <p className="text-2xl font-bold text-black">84</p>
            {/* <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              8.5% <span className="text-gray-600">Up from last Quarter</span>
            </div> */}
          </div>
          <div className="bg-purple-100 p-2 rounded-full">
            <Monitor className="text-purple-600 w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow w-full h-[100px] flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="text-sm font-medium text-gray-600 mb-1">
              Submissions This Month
            </h2>
            <p className="text-2xl font-bold text-black">5346</p>
            {/* <div className="text-xs text-red-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              8.5% <span className="text-gray-600">Down from last month</span>
            </div> */}
          </div>
          <div className="bg-orange-100 p-2 rounded-full">
            <Users className="text-orange-500 w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow w-full h-[100px] flex items-center justify-between px-4 py-3">
          <div>
            <h2 className="text-sm font-medium text-gray-600 mb-1">Featured</h2>
            <p className="text-2xl font-bold text-black">120</p>
            {/* <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              4.3% <span className="text-gray-600">Up from last Quarter</span>
            </div> */}
          </div>
          <div className="bg-green-100 p-2 rounded-full">
            <LineChart className="text-green-500 w-5 h-5" />
          </div>
        </div>
      </div>
      <Container />
    </div>
  );
};

export default Submissions;
