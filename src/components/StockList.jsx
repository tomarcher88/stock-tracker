import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

export const StockList = () => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [stock, setStock] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        const componentData = responses.map((resp) => {
          return {
            symbol: resp.config.params.symbol,
            data: resp.data,
          };
        });
        console.log(componentData);
        setStock(componentData);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <article>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Open</th>
            <th scope="col">Current</th>
            <th scope="col">Change</th>
            <th scope="col">Change %</th>
            <th scope="col">High (Day)</th>
            <th scope="col">Low (Day)</th>
            <th scope="col">Prev. Close</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(stock => {
            return (
              <tr className="table-row" key={stock.symbol}>
                <th scope="row">{stock.symbol}</th>
                <td>{stock.data.o}</td>
                <td>{stock.data.c}</td>
                <td>{stock.data.d}</td>
                <td>{stock.data.dp}</td>
                <td>{stock.data.h}</td>
                <td>{stock.data.l}</td>
                <td>{stock.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
};
