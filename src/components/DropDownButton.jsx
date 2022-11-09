import { useState, useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DropdownButton = ({ src }) => {
  const [open, setOpen] = useState(false);
  const { account, setLoginStatus } = useContext(LoginContext);

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("account");
    localStorage.removeItem("image");
    setLoginStatus(false);
    window.location.reload(false);
  }

  return (
    <>
      <div className="relative inline-block text-left">
        <div className="">
          <IconButton
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            onClick={() => setOpen(!open)}
          >
            <Avatar
              alt={account}
              src={src}
              imgProps={{ referrerPolicy: "no-referrer" }}
            />
          </IconButton>
        </div>
        {open && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <ul
              aria-labelledby="dropdownDefault"
              className="py-1 text-sm text-black rounded"
            >
              <li
                className="py-2 px-4 hover:bg-gray-600 cursor-pointer hover:text-white"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
              <li
                className="py-2 px-4 hover:bg-gray-600 cursor-pointer"
                onClick={logout}
              >
                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:text-white"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2"
                  >
                    Sign out
                  </button>
                </form>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownButton;
