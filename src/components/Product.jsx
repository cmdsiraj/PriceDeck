import React from "react";
import { useContext } from "react";
import Amazon from "../resources/amazon.png";
import Flipkart from "../resources/flipkart.png";
import { LoginContext } from "../Contexts/LoginContext";
import { getAuth } from "firebase/auth";
import db from "../firebase";
import firebase from "firebase/compat/app";

function Product(props) {
  const { loginStatus, account } = useContext(LoginContext);
  const auth2 = getAuth();
  const user = auth2.currentUser;

  const add = () => {
    console.log(account);
    if (user) {
      console.log(user.uid);
      db.collection("users").doc(user.uid).collection("products").add({
        Product_Name: props.data.Name,
        Product_Image: props.data.Image,
        Product_Link: props.data.Link,
        Product_price: props.data.Price,
        Product_website: props.data.Website,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      // No user is signed in.
    }
  };

  return (
    <div className="product-card p-1 min-h-full shadow-md  shadow-zinc-400 hover:shadow-lg hover:shadow-zinc-800 bg-amber-100 transition delay-150 duration-300 ease-in-out hover:bg-amber-200">
      <a href={props.data.Link} target="_blank" rel="noreferrer">
        <div
          className="product-image-container 
        flex flex-wrap justify-center mt-2"
        >
          <div className="flex justify-center">
            <img
              src={props.data.Image}
              alt={props.data.Name}
              className="w-auto h-auto max-h-62 object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col justify-items-center mt-5 mb-3">
          <div className="product-title text-center">
            <h4
              className="text-indigo-900 
            hover:text-rose-800 font-semibold"
            >
              {props.data.Name.substring(0, 60) + "...."}
            </h4>
            {props.data.Rating && (
              <span className="font-extrabold text-3xl">
                {props.data.Rating}
              </span>
            )}
          </div>
          <div className="product-price text-3xl font-medium text-center">
            <h3>{props.data.Price}</h3>
          </div>
          <div className="border-t-2 border-solid w-full text-center">
            <span className="font-extralight text-base text-stone-500">
              Product from
            </span>
            <div className="italic font-medium font-serif text-center">
              {props.data.Website === "AMAZON" ? (
                <img
                  src={Amazon}
                  className="w-12 h-12 ml-auto mr-auto rounded-full"
                />
              ) : (
                <img
                  src={Flipkart}
                  className="w-12 h-12 ml-auto mr-auto rounded-full"
                />
              )}
            </div>
          </div>
        </div>
      </a>
      {loginStatus ? (
        <button
          onClick={() => add()}
          className="w-full btn bg-blue-600 text-center text-white font-medium text-xs h-12 uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          ADD
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Product;
