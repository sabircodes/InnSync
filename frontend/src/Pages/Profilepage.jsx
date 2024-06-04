import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Placespage from "./Placespage";
import Accountnavigation from "./Accountnavigation";

const Profilepage = () => {
  const navigate = useNavigate();
  const { ready, user, SetUser } = useContext(UserContext);

  var { subpage } = useParams();
  console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }
  // adding custon css for the buttons

  // simple logout logic
  async function logout() {
    const response = await axios.post("/logout");
    if (response.status === 200) {
      alert("Logout suucesfull");
      SetUser(null);
      navigate("/");
    } else {
      alert("problem occured please check the console");
    }
  }

  // usercontext will tell us if ready then go ahead else , give loading here
  if (!ready) {
    return "Loadin...";
  }
  // this helps with the part where if u are not logged in a and u click on the account icon then i=u will go to login page
  if (ready && !user) {
    navigate("/login");
  }
  return (
    <div>
      <Accountnavigation/>
          {/* profile part */}
      {subpage === "profile" && (
        <div className=" flex flex-col gap-2 max-w-lg mx-auto text-center border p-10 mt-10 rounded-md shadow-md shadow-gray-300">
          <div className="flex justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20 "
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div>Hey {user.name}</div>
          <div>Email : {user.email}</div>
          <button
            onClick={logout}
            className="bg-primary rounded-full max-w-sm mx-auto px-4 py-1 mt-5 text-white"
          >
            Logout
          </button>
        </div>
      )}
      {/* accomodation or places part */}
      {subpage === "places" && <Placespage />}
    </div>
  );
};

export default Profilepage;
