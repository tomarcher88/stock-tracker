import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

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

  const updateColour = data => data > 0 ? "success" : "danger";

  const renderIcon = data => data > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;

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
            const {
              o: open,	c: current,	d: change,	dp: changePercentage,	 h: dayHigh,	l: dayLow,	pc: prevClose,
            } = stock.data;

            const {symbol} = stock;

            return (
              <tr className="table-row" key={symbol}>
                <th scope="row">{symbol}</th>
                <td>{open}</td>
                <td>{current}</td>
                <td className={`text-${updateColour(change)}`}>
                  {change}
                  {renderIcon(change)}
                </td>
                <td className={`text-${updateColour(changePercentage)}`}>
                  {changePercentage}
                  {renderIcon(changePercentage)}
                </td>
                <td>{dayHigh}</td>
                <td>{dayLow}</td>
                <td>{prevClose}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
};
