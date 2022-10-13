import { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = ({ stockData, symbol }) => {
  const { day, week, year } = stockData;
  const [timeFrame, setTimeFrame] = useState(day);

  const color =
    timeFrame[0].y < timeFrame[timeFrame.length - 1].y ? "#26C281" : "#ED3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      forceNiceScale: true,
      decimalsInFloat: 2,
    },
    tooltip: {
      x: {
        format: "dd MMM HH:MM ",
      },
    },
    dataLabels: {
      formatter: function (val) {
        return val.toFixed(2);
      },
    },
    stroke: {
      curve: "smooth",
    },
  };
  const series = [
    {
      name: symbol,
      data: timeFrame,
    },
  ];

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <h1>Stock Chart</h1>
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button
          className={`btn m-1 ${
            timeFrame === day ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setTimeFrame(day)}
        >
          24h
        </button>
        <button
          className={`btn m-1 ${
            timeFrame === week ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setTimeFrame(week)}
        >
          Week
        </button>
        <button
          className={`btn m-1 ${
            timeFrame === year ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setTimeFrame(year)}
        >
          Year
        </button>
      </div>
    </div>
  );
};
