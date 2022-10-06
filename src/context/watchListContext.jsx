import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = props => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  const addStock = stock => {
    
    if (watchList.indexOf(stock) === -1) {
      setWatchList(prev => [...prev, stock]);
    }
  }

  const deleteStock = stock => {
    const updatedList = watchList.filter(i => i !== stock ? true : false);
    setWatchList(updatedList);
  }

  return (
    <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
      {props.children}
    </WatchListContext.Provider>
  )
}