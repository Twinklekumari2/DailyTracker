import React, { useEffect, useState } from "react";
import { api } from "../../api";

const Card = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
        const token = localStorage.getItem("token");
      try {
        const res = await api.get("/user/notes", {
          headers:{
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

  return (
    <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {notes.map((note) => (
        <div
          key={note._id}
          className={`rounded-xl p-5 shadow-lg transition transform hover:scale-105 
            ${
              note.status === "done"
                ? "bg-green-200 border-green-500"
                : "bg-red-200 border-red-500"
            } border`}
        >
          {/* Date */}
          <div className="text-sm font-extrabold text-gray-900 mb-2 border-2">
            {new Date(note.date).toLocaleDateString()}
          </div>

          {/* Notes */}
          <div className="text-lg font-medium text-gray-900 mb-3">
            {note.notes}
          </div>

          {/* Status */}
          <div
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full 
              ${
                note.status === "done"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
          >
            {note.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
