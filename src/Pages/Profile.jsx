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
  const [ignore, setIgnore] = useState(false);
  // const [counter, setCounter] = useState(0);
  // const [newPrice, setNewPrice] = useState([]);

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

      console.log(ignore);
      if (!ignore) {
        const link = "/scrape_link/" + user.uid;
        try {
          fetch(link)
            .then((res) => res.json())
            .then((product_data) => {
              console.log(product_data);
            });
        } catch (e) {
          alert(e);
        }
        setIgnore(true);
      }
    }
  }, [setProducts, user, loginStatus, setUserid, ignore, setIgnore]);

  const handleDelete = async (id, name) => {
    const path = "/users/" + userid + "/products";
    const docRef = doc(db, path, id);
    console.log(name);

    await deleteDoc(docRef);
    alert("deleted");
    setIgnore(false);
  };

  return (
    <>
      <div className="Navbar sticky top-0">
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
      {/* product.data().Product_price > product.data().Latest_Price */}
      <div>
        <h1 className="text-center text-2xl text-slate-500 pt-3 pb-3">
          Your Added products
        </h1>
        <div className="p-4 grid grid-cols-2 gap-5">
          {products.map((product) => (
            <div className="border rounded-lg shadow-md" key={product.id}>
              {parseInt(product.data().Product_price.replace("[^0-9]", "")) >
              parseInt(product.data().Latest_Price.replace("[^0-9]", "")) ? (
                <>
                  <p className="border rounded-tl-lg rounded-tr-lg text-center p-2 bg-green-500 text-white text-lg">
                    Price Drop
                  </p>
                </>
              ) : (
                <></>
              )}
              <a
                href={product.data().Product_Link}
                className="flex flex-col items-center bg-white md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover m-2 w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={product.data().Product_Image}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {product.data().Product_Name}
                  </h5>
                  <p>{product.data().Product_website}</p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <span className="text-2xl font-bold tracking-tight text-gray-900">
                      {product.data().Product_price}
                    </span>
                  </p>

                  <p className="">
                    Product Added on:{" "}
                    {new Date(product.data().timestamp?.toDate()).toUTCString()}
                  </p>
                  <p className="text-lg">
                    Current Product price:{" "}
                    <span className="font-bold">
                      {product.data().Latest_Price}
                    </span>
                  </p>
                </div>
              </a>
              <button
                onClick={() => {
                  handleDelete(product.id, product.Product_website);
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
      </div>
    </>
  );
}

export default Profile;
