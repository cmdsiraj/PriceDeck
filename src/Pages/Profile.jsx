import React from "react";
import { useState, useContext, useEffect } from "react";
import logo from "../resources/logo2.png";
import { LoginContext } from "../Contexts/LoginContext";
import DropDownButton from "../components/DropDownButton";
import { getAuth } from "firebase/auth";
import db from "../firebase";

function Profile() {
  const { image, loginStatus } = useContext(LoginContext);
  const auth2 = getAuth();
  const user = auth2.currentUser;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (loginStatus) {
      db.collection("users")
        .doc(user.uid)
        .collection("products")
        .onSnapshot((snapshot) => {
          setProducts(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [setProducts, user]);

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
      <div className="Body">
        <div>
          <div>
            <img src="https://rukminim1.flixcart.com/image/312/312/kkbh8cw0/washing-machine-new/z/y/h/lwms75ra1-lloyd-original-imafzzvgsr4g7tyf.jpeg?q=70"/>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
