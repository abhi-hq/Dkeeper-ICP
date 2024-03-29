import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.title, newNote.content)
      return [newNote, ...prevNotes];
    });
  }

  useEffect(()=>{ //re rendering of react i.e website loads up again
  console.log("useEffect triggered");
  fetchData();

  },[]) // empty array to stop re renderinh multiple times

  async function fetchData(){
    const notesArray=await dkeeper.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    dkeeper.delNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
