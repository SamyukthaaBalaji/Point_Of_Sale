import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import "./dashboard.css";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [salesPercentage, setSalesPercentage] = useState([]);
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    // Fetch data from the APIs
    const fetchData = async () => {
      try {
        const usersCountResponse = await fetch(
          "https://posapp1-hg6w.vercel.app/dash/allusers"
        );
        const usersCountData = await usersCountResponse.json();
        console.log(usersCountData);
        setUsersCount(usersCountData.count);

        const productCountResponse = await fetch(
          "https://posapp1-hg6w.vercel.app/dash/allproducts"
        );
        const productCountData = await productCountResponse.json();
        setProductsCount(productCountData.count);

        const categoryCountsResponse = await fetch(
          "https://posapp1-hg6w.vercel.app/dash/category-counts"
        );
        const categoryCountsData = await categoryCountsResponse.json();
        setCategoryData(categoryCountsData);

        const totalCategoriesResponse = await fetch(
          "https://posapp1-hg6w.vercel.app/dash/total-categories"
        );
        const totalCategoriesData = await totalCategoriesResponse.json();

        console.log(totalCategoriesData);
        setCategoryCount(totalCategoriesData.total);

        // Dummy data for sales count
        setSalesCount(10);

        // Dummy sales percentage data
        setSalesPercentage([
          { id: 0, value: 62, label: "% Sold" },
          { id: 1, value: 38, label: "% UnSold" },
        ]);

        // Dummy rating data
        setRatingData([2, 5.5, 2, 8.5, 1.5, 5]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="top-boxes">
        <div className="box">
          <h3>Users</h3>
          <p>{usersCount}</p>
        </div>
        <div className="box">
          <h3>Products</h3>
          <p>{productsCount}</p>
        </div>
        <div className="box">
          <h3>Sales</h3>
          <p>{salesCount}</p>
        </div>
        <div className="box">
          <h3>Category</h3>
          <p>{categoryCount}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-container bar-chart align">
          <h1 style={{ alignSelf: "start" }}>Monthly Sales</h1>
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
            <h1 style={{ alignSelf: "start" }}>Category</h1>
            <PieChart
              series={[
                {
                  data: categoryData.map((item, index) => ({
                    id: index,
                    value: item.count,
                    label: item.category,
                  })),
                },
              ]}
              width={550}
              height={300}
            />
          </div>
          <div className="chart-container pie-chart align">
            <h1 style={{ alignSelf: "start" }}>Sales %</h1>
            <PieChart
              series={[{ data: salesPercentage }]}
              width={550}
              height={310}
            />
          </div>
        </div>
      </div>
      <div className="chart-container line-chart align">
        <h1 style={{ alignSelf: "start" }}>Rating</h1>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[{ data: ratingData }]}
          width={1000}
          height={500}
        />
      </div>
    </div>
  );
};

export default Dashboard;
