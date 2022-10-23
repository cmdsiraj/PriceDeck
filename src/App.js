import React from "react";
import { useState } from "react";
import logo from "./resources/logo.png";
import Productsscreen from "./components/Productsscreen";
import Spinner from "./components/Spinner";

function App() {
  const [data, setData] = useState([{}]);
  const [product, setProduct] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(true);

  const get_data = () => {
    if (product) {
      setLoader(true);
      const link = "/scrape/" + product;
      setData([{}]);
      setCurrentProduct(product);
      setVisible(true);
      try {
        fetch(link)
          .then((res) => res.json())
          .then((product_data) => {
            setData(product_data);
            setLoader(false);
          });
      } catch (e) {
        setCurrentProduct("UNABLE TO GET PRODUCTS DUE TO: " + e);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      get_data();
    }
  };
  return (
    <div className="p-0 bg-red-50 h-screen">
      <div className="bg-slate-400 top-0 right-0 left-0 sticky w-full grid w-full pt-3 gap-5 pb-3 lg:grid-cols-2 sm:grid-cols-1 pl-20 pr-20 sm:content-center sm:text-base">
        <div className="text-2xl font-bold tracking-wider flex flex-row items-center justify-items-center gap-x-3 gap-y-3 sm:content-center md:content-center">
          <img
            src={logo}
            alt="logo"
            width="60px"
            height="60px"
            className="text-white opacity-100 sm:w-11 h-11"
          />
          <h1 className="p-0 m-0 cursor-pointer text-red-700 opacity-100">
            Price Deck
          </h1>
        </div>
        <div className="flex items-stretch mb-4 flex-row gap-4 w-full pt-4 sm:flex-col md:flex-row sm:items-center xs:flex-col">
          <input
            onChange={(e) => setProduct(e.target.value)}
            type="search"
            className="form-control opacity-100 relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={get_data}
            className="w-24 btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </div>
      {visible ? (
        loader ? (
          <Spinner />
        ) : (
          <Productsscreen data={data} product={currentProduct} />
        )
      ) : (
        <div className="text-center font-serif items-center flex flex-col">
          <div className="flex gap-1 items-center lg:flex-row sm:flex-col mt-32">
            <span>Welcome to </span>
            <span className="font-black text-2xl text-red-700">PRICE DECK</span>
          </div>
          <span>
            Search for the product and choose the product with best price
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
