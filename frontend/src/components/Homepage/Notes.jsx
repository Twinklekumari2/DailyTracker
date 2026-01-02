import React, { useEffect, useState } from "react";
import { api } from "../../api";
import Input from "./Input";
import calendar from "./../../assets/calendar.png";
import Calendar from "./Calendar";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({});
  const [showNotes, setShowNotes] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await api.get("/user/name", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.response);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <section className="relative flex flex-col items-center">
      
      {/* Header */}
      <div className="flex items-center justify-around w-full gap-4 text-xs mt-5 sm:text-xl md:text-2xl px-2">
        <div className="flex items-center gap-3">
        <h1 className="font-extrabold">Welcome, {data.userName}</h1>

        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className="hover:scale-110 transition-transform"
        >
          <img src={calendar} alt="calendar" className="h-8 w-10 sm:h-10 " />
        </button>
        </div>
        <Button name="Logout" functionClick={handleLogoutClick}/>
      </div>

      {/* Calendar popup */}
      {showCalendar && <Calendar functionClick={() => setShowCalendar(false)} />}

      {/* Add Notes */}
      <div
        onClick={() => setShowNotes((prev) => !prev)}
        className="mt-6 px-6 py-2 cursor-pointer rounded-full bg-pink-600 text-white font-bold hover:bg-pink-500 transition"
      >
        + Add Notes
      </div>

      {showNotes && <Input setShowNotes={setShowNotes} />}
    </section>
  );
};

export default Notes;
