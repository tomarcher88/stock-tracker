import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",")
      ? localStorage.getItem("watchList").split(",")
      : 
      ["META", "GOOGL", "MSFT", "AMZN", "AAPL"]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList((prev) => [...prev, stock]);
    }
  };

  const deleteStock = (stock) => {
    const updatedList = watchList.filter((i) => (i !== stock ? true : false));
    setWatchList(updatedList);
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
