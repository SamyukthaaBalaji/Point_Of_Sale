import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="top-boxes">
        <div className="box">
          <h3>Users</h3>
          <p>13</p>
        </div>
        <div className="box">
          <h3>Products</h3>
          <p>115</p>
        </div>
        <div className="box">
          <h3>Sales</h3>
          <p>10</p>
        </div>
        <div className="box">
          <h3>Category</h3>
          <p>5</p>
        </div>
      </div>
      <div className="charts-container ">
        <div className="chart-container bar-chart align">
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
            ]}
            series={[{ data: [1, 2, 1, 3, 2, 1, 4, 5, 2, 1, 2, 3] }]}
            width={1000}
            height={490}
          />
        </div>
        <div className="pie-charts">
          <div className="chart-container pie-chart align">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 40, label: "Groceries" },
                    { id: 1, value: 15, label: "Electronics" },
                    { id: 2, value: 20, label: "Clothing" },
                    { id: 2, value: 20, label: "Home Appliances" },
                    { id: 2, value: 20, label: "Toys" },
                  ],
                },
              ]}
              width={550}
              height={300}
            />
          </div>
          <div className="chart-container pie-chart align">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 62, label: "% Sold" },
                    { id: 1, value: 38, label: "% UnSold" },
                  ],
                },
              ]}
              width={550}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className="chart-container line-chart align">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={1000}
          height={500}
        />
      </div>
    </div>
  );
};

export default Dashboard;
