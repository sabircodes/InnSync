import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Bookingwidget = ({ place }) => {
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [guest, setguest] = useState(1);
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(()=>{
    if(user){
      setName(user.name);
    }
  },[user])

  let numofdays = 0;
  if (checkIn && checkOut) {
    numofdays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookthisplace() {
    
   const response = await axios.post("/booking",{
    checkIn,
    checkOut,
    guest,
    name,
    number,
    price: numofdays * place.price,
    place: place._id,
  });
  console.log(response.data._id);
  const bookingId = response.data._id;
  setRedirect('/account/bookings/' + bookingId);


  }
if(redirect){
    return <Navigate to={redirect}/>
}
  return (
    <div>
      <div className="bg-white  shadow-md py-2 rounded-2xl px-4">
        <div className="text-lg text-center">
          {" "}
          <span className="font-bold">Price</span>: ${place.price} / per night
        </div>
        <div className="border rounded-2xl ">
          <div className="flex">
            <div className=" py-3 px-4 rounded-2xl ">
              <label>Check In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setcheckIn(e.target.value)}
              />
            </div>
            <div className="py-3 px-4 rounded-2xl border-l ">
              <label>Check Out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setcheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 rounded-2xl border-t ">
            <label>Guest</label>
            <input
              type="string"
              value={guest}
              onChange={(e) => setguest(e.target.value)}
            />
          </div>
          {numofdays > 0 && (
            <div className="py-3 px-4 rounded-2xl border-l ">
              <label>Your full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Mobile Number</label>
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          )}
        </div>
        <button
          onClick={bookthisplace}
          className="bg-primary rounded-lg py-2  text-white mt-2 w-full "
        >
          Book This Place for
          {numofdays > 0 && (
            <span className="px-4 font-semibold">
              ${numofdays * place.price}{" "}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Bookingwidget;
