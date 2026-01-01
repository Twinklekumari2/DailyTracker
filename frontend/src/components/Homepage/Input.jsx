import React, { useState } from "react";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Input = ({setShowNotes}) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    notes: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.notes.trim()) {
      toast.error("Notes cannot be empty");
      return;
    }
    const token = localStorage.getItem("token")
    try {
      const url = "/user/notes";
      const res = await api.post(url, data, {
           headers:{
            Authorization:`Bearer ${token}`
           }
      }
      );

      console.log(res.data);
      setShowNotes(false);
      toast.success("Note added successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="w-screen md:w-auto mt-5 relative flex items-center justify-center bg-linear-to-br from-pink-100 to-pink-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white/25 absolute top-0 backdrop-blur-xl shadow-xl rounded-2xl p-6 w-[90%] sm:w-100 space-y-4 border border-white/30"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Add Note
        </h2>

        {/* Notes */}
        <textarea
          name="notes"
          rows={5}
          onChange={handleChange}
          value={data.notes}
          placeholder="Write your notes..."
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Status */}
        <input
          type="text"
          name="status"
          onChange={handleChange}
          value={data.status}
          placeholder="Status (e.g. pending, done)"
          className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Button */}
        <button
          type="submit"
          className="cursor-pointer w-full bg-pink-600 text-white py-2 rounded-xl font-semibold hover:bg-pink-700 transition duration-300"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default Input;
