import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

function Main() {
  const [search, setSearch] = useState("");
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "5e3e581014msh29e76e0e097ada5p1e9877jsn7f31553e9ffc",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  const fetchCryptoData = () => {
    return axios.request(options);
  };

  const onSuccess = (data) => {
    console.log("preform side effect after data fetching ", data);
  };
  const onError = (error) => {
    console.log("preform side effect after encountering error ", error);
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    "coins",
    fetchCryptoData,
    {
      onError,
      onSuccess,
    }
  );

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  if (isFetching) {
    return <h1>....Fetching.....</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  console.log(search);
  return (
    <>
      <div className="py-4 flex justify-evenly">
        <input
          type="text"
          placeholder="Enter coin"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className=" w-[70%] rounded-lg h-8 outline-none text-black hover:bg-gray-100"
        />
      </div>
      <div className="bg-gray-400 grid grid-cols-1 gap-8 h-[1000%] md:grid-cols-3 pb-[21%]">
        {data.data.data.coins
          .filter((item) => {
            return search.toLocaleLowerCase() === ""
              ? item
              : item.name.toLocaleLowerCase().includes(search);
          })
          .map((item) => {
            return (
              <div
                key={item.uuid}
                className=" mx-auto rounded text-center  shadow-lg bg-gray-200 h-auto p-4 w-[80%] md:w-auto font-bold hover:bg-gray-50/25"
              >
                <img src={item.iconUrl} alt="/" className="w-40 h-40 mx-auto" />
                <h1>{item.name}</h1>
                <h1>{item.symbol}</h1>
                <h1>Rank:{item.rank}</h1>
                <h1>Market Cap:${item.marketCap}</h1>
                <h1>Price:${item.price}</h1>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Main;
