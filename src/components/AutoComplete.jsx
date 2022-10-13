import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";
import { useState, useEffect, useContext } from "react";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const {
    addStock,
  } = useContext(WatchListContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        console.log(response.data.result);
        setResults(response.data.result);
      } catch (err) {}
    };
    search.length > 0 ? fetchData() : setResults([]);
  }, [search]);
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          autoComplete="off"
          id="search"
          type="text"
          className="form-control"
          style={{ backgroundColor: "rgba(145,158,171, 0.04)" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search">Search</label>
        <ul
          style={{ height: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer", }}
          className={`dropdown-menu ${results.length > 0 ? "show" : ""}`}
        >
          {results.map((result) => {
            return (
              <li className="dropdown-item" key={result.displaySymbol} onClick={() => {
                addStock(result.symbol)
                setSearch("");
                }}>
                {result.description} ({result.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// Timestamp: 6:57:01