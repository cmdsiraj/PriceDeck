import React from "react";
import { useState, useContext, useEffect } from "react";
import logo from "../resources/logo2.png";
import { LoginContext } from "../Contexts/LoginContext";
import DropDownButton from "../components/DropDownButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase";

function Profile() {
  const { image, loginStatus } = useContext(LoginContext);
  const auth2 = getAuth();
  const user = auth2.currentUser;
  const [products, setProducts] = useState([]);
  const [userid, setUserid] = useState();

  useEffect(() => {
    if (loginStatus) {
      const auth2 = new getAuth();
      onAuthStateChanged(auth2, (user) => {
        setUserid(user.uid);
        db.collection("users")
          .doc(user.uid)
          .collection("products")
          .onSnapshot((snapshot) => {
            setProducts(snapshot.docs.map((doc) => doc));
          });
      });
    }
  }, [setProducts, user, loginStatus, setUserid]);

  const handleDelete = async (id) => {
    const path = "/users/" + userid + "/products";
    const docRef = doc(db, path, id);

    await deleteDoc(docRef);
    alert("deleted");
  };

  return (
    <>
      <div className="Navbar">
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black sticky w-full grid pt-3 pb-3 lg:grid-cols-2 sm:grid-cols-1 sm:pl-20 sm:pr-20 sm:content-center sm:text-base">
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
          <div className="text-right">
            {loginStatus ? (
              <>
                <DropDownButton src={image} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-5">
        {products.map((product) => (
          <div className="border rounded-lg shadow-md">
            <a
              href={product.data().Product_Link}
              class="flex flex-col items-center bg-white md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                class="object-cover m-2 w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={product.data().Product_Image}
                alt=""
              />
              <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.data().Product_Name}
                </h5>
                <p>{product.Product_website}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    {product.data().Product_price}
                  </h2>
                </p>
                <p>
                  Product Added on:{" "}
                  {new Date(product.data().timestamp?.toDate()).toUTCString()}
                </p>
              </div>
            </a>
            <button
              onClick={() => {
                handleDelete(product.id);
              }}
              className="w-24 btn ml-auto mr-auto px-6 py-2.5 bg-amber-600 text-white font-medium text-xs h-12 leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Profile;
