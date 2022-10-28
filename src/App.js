import React from "react";
import { useState } from "react";
import logo from "./resources/logo2.png";
import bodyImage from "./resources/body_image.jpg";
import Productsscreen from "./components/Productsscreen";
import LoadingScreen from "./components/LoadingScreen";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";

function App() {
  const [data, setData] = useState([{}]);
  const [product, setProduct] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(true);
  const [userLogged, setUserLogged] = useState(null);
  const [{}, dispatch] = useStateValue();

  const Login = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        setUserLogged({
          email: result.user.email,
          name: result.user.displayName,
          imgURL: result.user.photoURL,
        });
      })
      .catch((error) => alert(error.message));
  };

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
    <div className="p-0 bg-white h-screen">
      <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black sticky w-full grid pt-3 gap-5 pb-3 lg:grid-cols-2 sm:grid-cols-1 sm:pl-20 sm:pr-20 sm:content-center sm:text-base">
        <div className="text-2xl font-bold tracking-wider flex flex-row items-center justify-items-center gap-x-3 gap-y-3 sm:content-center md:content-center">
          <a href="/" className="text-white text-3xl font-bold italic">
            <img
              src={logo}
              alt="logo"
              width="70px"
              height="70px"
              className="text-white p-0 opacity-100 sm:w-11 sm:h-11"
            />
          </a>
          <div>
            <a href="/" className="text-white text-3xl font-bold italic">
              PRICE <span className="text-amber-600">DECK</span>
            </a>
          </div>
        </div>
        <div className="flex items-stretch mb-4 flex-row gap-4 w-full pt-4 sm:flex-col md:flex-row sm:items-center xs:flex-col">
          <input
            onChange={(e) => setProduct(e.target.value)}
            type="search"
            className="form-control opacity-100 relative flex-auto min-w-0 block w-full h-12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search for products here..."
            aria-label="Search"
            aria-describedby="button-addon2"
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            onClick={get_data}
            className="w-24 btn px-6 py-2.5 bg-amber-600 text-white font-medium text-xs h-12 leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
          {userLogged ? (
            <IconButton>
              <Avatar alt={userLogged?.name} src={userLogged?.imgURL} />
            </IconButton>
          ) : (
            <button
              className="w-24 btn px-6 py-2.5 bg-amber-600 text-white font-medium text-xs h-12 leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              onClick={Login}
              type="button"
            >
              Login
            </button>
          )}
        </div>
      </div>
      {visible ? (
        loader ? (
          <LoadingScreen />
        ) : (
          <Productsscreen data={data} product={currentProduct} />
        )
      ) : (
        <div className="text-center bg-black font-serif w-full grid grid-cols-2 h-fit gap-1 p-4 shadow-md shadow-gray-500">
          <div>
            <img src={bodyImage} className="w-full h-full" />
          </div>
          <div className="h-full text-center grid place-items-center">
            <span>
              <h1 className="text-white text-8xl font-bold italic">
                PRICE <span className="text-amber-600">DECK</span>
              </h1>
              <h4 className="text-white text text-4xl">
                A Price Comparision Website
              </h4>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
