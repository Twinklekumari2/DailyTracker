import React, { useEffect, useState } from "react";
import { api } from "../../api";
import Input from "./Input";
import calendar from "./../../assets/calendar.png";
import Calendar from "./Calendar";

const Notes = () => {
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

  return (
    <section className="relative flex flex-col items-center">
      
      {/* Header */}
      <div className="flex items-center gap-6 font-extrabold text-3xl mt-5">
        <h1>Welcome, {data.userName}</h1>

        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className="hover:scale-110 transition-transform"
        >
          <img src={calendar} alt="calendar" className="h-10 w-10" />
        </button>
      </div>

      {/* Calendar popup */}
      {showCalendar && <Calendar />}

      {/* Add Notes */}
      <div
        onClick={() => setShowNotes((prev) => !prev)}
        className="mt-6 px-6 py-2 cursor-pointer rounded-full bg-pink-400 text-white font-semibold hover:bg-pink-500 transition"
      >
        Add Notes
      </div>

      {showNotes && <Input setShowNotes={setShowNotes} />}
    </section>
  );
};

export default Notes;
