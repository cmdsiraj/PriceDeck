import React from "react";
import { useState } from "react";
import Product from "./components/Product";
import logo from "./resources/logo.png";

function App() {
  const [data, setData] = useState([{}]);
  const [product, setProduct] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [visible, setVisible] = useState(false);

  const get_data = () => {
    if (product) {
      const link = "/scrape/" + product;
      setData([{}]);
      setCurrentProduct(product);
      setVisible(true);
      try {
        fetch(link)
          .then((res) => res.json())
          .then((product_data) => {
            setData(product_data);
            console.log(product_data);
          });
      } catch (e) {
        setCurrentProduct("UNABLE TO GET PRODUCTS DUE TO: " + e);
      }
    }
  };
  return (
    <div className="p-0 bg-slate-900">
      <div className="bg-slate-400 top-0 right-0 left-0 sticky w-full grid w-full pt-3 gap-5 pb-3 lg:grid-cols-2 sm:grid-cols-1 pl-20 pr-20 ">
        <div className="text-2xl font-bold tracking-wider flex flex-row items-center gap-x-3 gap-y-3">
          <img
            src={logo}
            alt="logo"
            width="60px"
            height="60px"
            className="text-white"
          />
          <h1 className="p-0 m-0 cursor-pointer text-red-700">Price Deck</h1>
        </div>
        <div className="flex items-stretch mb-4 flex-row gap-4 w-full pt-4">
          <input
            onChange={(e) => setProduct(e.target.value)}
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
          <button
            onClick={get_data}
            className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
      </div>
      {visible ? (
        <div className="p-4">
          <h4 className="mb-2">
            Showing results for{" "}
            <b className="text-xl text-neutral-800">
              <i>{currentProduct}</i>
            </b>
          </h4>
          <div
            className="grid gap-3 justify-around 
          items-center place-content-center
          md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {data.map((d) => {
              return <Product key={d.Link} data={d} />;
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1>Search for the Products</h1>
        </div>
      )}
    </div>
  );
}

export default App;
