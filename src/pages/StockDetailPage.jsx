import { useEffect, useState } from "react";
import { BsTypeH1 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

  const formatData = (data) => {
    const values = data.t.map((item, index) => {
      return {
        x: item * 1000,
        y: data.c[index],
      }
    })
    return values
  };

export const StockDetailPage = () => {
  const [stockData, setStockData] = useState();
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      const weekAgo = currentTime - 7 * 24 * 60 * 60;
      const yearAgo = currentTime - 365 * 24 * 60 * 60;
      let prevMarketOpenDay;
      switch (date.getDay()) {
        case 0:
          prevMarketOpenDay = currentTime - 3 * 24 * 60 * 60;
          console.log("Happy Sunday!");
          break;
        case 6:
          prevMarketOpenDay = currentTime - 2 * 24 * 60 * 60;
          console.log("Happy Saturday!");
          break;
        default:
          prevMarketOpenDay = currentTime - 24 * 60 * 60;
          console.log("Enjoy the rest of your week!");
          break;
      }

      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: prevMarketOpenDay,
              to: currentTime,
              resolution: 15,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: weekAgo,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: yearAgo,
              to: currentTime,
              resolution: "D",
            },
          }),
        ]);
        console.log(responses);

        setStockData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <div>
      {stockData ? (
        <>
          <StockChart stockData={stockData} symbol={symbol} />
          <StockData symbol={symbol} />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
