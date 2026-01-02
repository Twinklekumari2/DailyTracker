import React, { useEffect, useState } from "react";
import { api } from "../../api";

const Calendar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/user/months", {
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

  if (!data) return <p className="text-center mt-4">Loading...</p>;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return (
    <>
      {/* Background Overlay: Only visible on mobile */}
      <div className="fixed inset-0 bg-black/40 z-40 sm:hidden" />

      <div
        className="
          fixed z-50 
          /* Mobile: Bottom Sheet style */
          bottom-0 left-0 right-0 
          rounded-t-3xl 
          /* Desktop: Floating Card style */
          sm:absolute sm:top-20 sm:right-10 sm:left-auto sm:bottom-auto
          sm:w-80 sm:rounded-2xl 
          /* Common Styles */
          bg-white shadow-2xl p-6
        "
      >
        {/* Handle for mobile visual cue */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4 sm:hidden" />

        <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 text-center mb-6">
          Notes by Month
        </h2>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {months.map((m) => (
            <div
              key={m}
              className="flex flex-col items-center justify-center rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors py-3 border border-pink-100"
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-pink-500">
                {m}
              </span>
              <span className="text-lg sm:text-xl font-black text-pink-900">
                {data[m] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;