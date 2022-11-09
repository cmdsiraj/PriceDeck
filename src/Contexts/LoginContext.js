import { createContext, useState, useEffect } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [image, setImage] = useState("");
  const [loginStatus, setLoginStatus] = useState();

  useEffect(() => {
    setAccount(localStorage.getItem("account"));
    setImage(localStorage.getItem("image"));
    setLoginStatus(localStorage.getItem("loginStatus") === "true");
  }, [account, loginStatus]);

  useEffect(() => {
    if (loginStatus) {
      localStorage.setItem("account", account);
      localStorage.setItem("loginStatus", loginStatus);
      localStorage.setItem("image", image);
    }
  }, [account, loginStatus]);

  return (
    <LoginContext.Provider
      value={{
        account,
        setAccount,
        loginStatus,
        setLoginStatus,
        image,
        setImage,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
