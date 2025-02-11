import {
  Card,
  Title,
  BarChart,
  ColGrid,
  Block,
  Metric,
  Text,
} from "@tremor/react";
import Female from "../../assets/female.png";
import MaleFemale from "../../assets/male-female.png";
import Male from "../../assets/male.png";

const chartdata = [
  {
    class: "Nursery",
    "Number of boys": 21,
    "Number of girls": 18,
  },
  {
    class: "LKG",
    "Number of boys": 14,
    "Number of girls": 11,
  },
  {
    class: "UKG",
    "Number of boys": 9,
    "Number of girls": 15,
  },
  {
    class: "Class 1",
    "Number of boys": 19,
    "Number of girls": 24,
  },
  {
    class: "Class 2",
    "Number of boys": 26,
    "Number of girls": 8,
  },
  {
    class: "Class 3",
    "Number of boys": 10,
    "Number of girls": 12,
  },
  {
    class: "Class 4",
    "Number of boys": 14,
    "Number of girls": 10,
  },
  {
    class: "Class 5",
    "Number of boys": 12,
    "Number of girls": 23,
  },
  {
    class: "Class 6",
    "Number of boys": 23,
    "Number of girls": 8,
  },
  {
    class: "Class 7",
    "Number of boys": 29,
    "Number of girls": 13,
  },
  {
    class: "Class 8",
    "Number of boys": 7,
    "Number of girls": 27,
  },
  {
    class: "Class 9",
    "Number of boys": 19,
    "Number of girls": 7,
  },
  {
    class: "Class 10",
    "Number of boys": 26,
    "Number of girls": 21,
  },
];

// const kpiData = [
//   {
//     title: "Teachers Staff",
//     metric: "20",
//     icon: Users,
//   },
//   {
//     title: "Female Teachers",
//     metric: "9",
//     icon: Girl,
//   },
//   {
//     title: "Male Teachers",
//     metric: "11",
//     icon: UserCheck,
//   },
//   {
//     title: "Student Strength",
//     metric: "114",
//     icon: UsersRound,
//   },
//   {
//     title: "No. of Girls",
//     metric: "54",
//     icon: Girl,
//   },
//   {
//     title: "No. of Boys",
//     metric: "60",
//     icon: Boy,
//   },
// ];

function Dashboard() {
  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="ie-na-header flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          Hello Admin!
        </h1>
      </header>

      <div className="mt-6 flex justify-between gap-4">
        <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <img
            src={MaleFemale}
            alt="Male and Female Icon"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          {/* Corrected */}
          <h2 className="text-center text-lg font-semibold text-gray-700">
            Total Students
          </h2>
          <p className="text-2xl font-bold text-blue-500">514</p>
        </div>
        <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <img
            src={Female}
            alt="Female Icon"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          {/* Corrected */}
          <h2 className="text-center text-lg font-semibold text-gray-700">
            No of Girls
          </h2>
          <p className="text-2xl font-bold text-blue-500">267</p>
        </div>
        <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <img
            src={Male}
            alt="Male Icon"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          {/* Corrected */}
          <h2 className="text-center text-lg font-semibold text-gray-700">
            No of Boys
          </h2>
          <p className="text-2xl font-bold text-blue-500">247</p>
        </div>
      </div>

      <Block marginTop="mt-6">
        <Card
          shadow={false}
          className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Title>Class-wise student distribution</Title>
          <BarChart
            data={chartdata}
            dataKey="class"
            categories={["Number of boys", "Number of girls"]}
            colors={["blue", "fuchsia"]}
            marginTop="mt-6"
            stack={true}
            yAxisWidth="w-6"
          />
        </Card>
      </Block>
    </div>
  );
}

export default Dashboard;
