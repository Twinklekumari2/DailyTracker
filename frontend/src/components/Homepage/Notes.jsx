import React, { useEffect, useState } from "react";
import { api } from "../../api";
import Input from "./Input";
import Card from "./Card";

const Notes = () => {
  const [data, setData] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const url = "/user/name";
        const res = await api.get(url);
        setData(res.data.response);
        console.log(res.data.response);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  const handleNoteClick = () => {
    setShowNotes((prev) => !prev);
  }
  return (
    <section className="flex flex-col items-center">
      <div className="flex justify-between items-center font-extrabold text-3xl mt-3 py-2 px-4 mb-4">
        <h1>Welcome, {data.userName}</h1>
      </div>
      <div className="px-3 py-1 cursor-pointer rounded-2xl bg-pink-300">
        <h3 onClick={handleNoteClick}>Add Notes</h3>
      </div>
      {showNotes && <Input setShowNotes={setShowNotes}/>}
    </section>
  );
};

export default Notes;
