import React, { useEffect, useState } from "react";
import { api } from "../../api";

const Card = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await api.get("/user/notes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotes(res.data.response);
        console.log(res.data.response)
      } catch (err) {
        console.log(err);
      }
    };

    getNotes();
  }, []);

  if(!notes) return <p>Loading...</p>

  return (
    /* Improved grid responsiveness and outer padding */
    <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {notes.map((note) => (
        <div
          key={note._id}
          className={`
            relative flex flex-col justify-between
            rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1
            border-l-4 
            ${
              note.status === "Done"
                ? "bg-green-50 border-green-500"
                : "bg-red-50 border-red-500"
            }
          `}
        >
          <div>
            <div className="text-xl font-extrabold uppercase tracking-wider text-black mb-2">
              {new Date(note.date).toLocaleDateString()}
            </div>

            <div className="text-base font-semibold text-gray-800 mb-4 leading-relaxed line-clamp-3">
              {note.notes}
            </div>
          </div>

          <div className="flex mt-auto">
            <span
              className={`px-3 py-1 text-xs font-bold rounded-lg shadow-sm
                ${
                  note.status === "Done"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
            >
              {note.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;