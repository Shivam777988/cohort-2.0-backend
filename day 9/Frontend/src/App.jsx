import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import axios from "axios";
function App() {
  const [notes, setNotes] = useState([{

    title:
      "test title 1",
    description:
      "test description "
  }
  ,{

    title:
      "test title 2",
    description:
      "test description "
  },
  {

    title:
      "test title 3",
    description:
      "test description "
  },
  {

    title:
      "test title 4",
    description:
      "test description "
  }

  ])
  const [editingId, setEditingId] = useState(null);
const [editValue, setEditValue] = useState("");

  console.log("hello sir");

  function fetchNotes(params) {
    axios.get("https://cohort-2-0-backend-ygz1.onrender.com/api/notes")
  .then((res)=>{
    setNotes(res.data.notes);
    
  })
  }
  useEffect(()=>{
fetchNotes();
  },[]) 
  
  

  function handleSubmit(e) {
    e.preventDefault();
    const{title,description}=e.target.elements;
    console.log(title,description);

    axios.post("https://cohort-2-0-backend-ygz1.onrender.com/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
  }

  function handleDeleteNote(noteId) {
    // console.log(noteId);
    axios.delete("https://cohort-2-0-backend-ygz1.onrender.com/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }
 function handleSaveUpdate(noteId) {
  axios.patch(`https://cohort-2-0-backend-ygz1.onrender.com/api/notes/${noteId}`, {
    description: editValue
  })
  .then(res => {
    console.log(res.data);
    setEditingId(null);     // exit edit mode
    setEditValue("");      // clear input
    fetchNotes();          // refresh list
  })
  .catch(err => console.error(err));
}

  return (
    <>
    <form className="note-create-form" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
<button>create note</button>
    </form>
    <div className="notes">
      {notes.map(note=>(
     <div className="note">

<h1>{note.title}</h1>
{editingId===note._id?(
  <input value={editValue} onChange={(e)=>setEditValue(e.target.value)} />
):<p>{note.description}</p>}
    {editingId === note._id ? (
      <button onClick={() => handleSaveUpdate(note._id)}>Save</button>
    ) : (
      <button onClick={() => {
        setEditingId(note._id);
        setEditValue(note.description);
      }}>
        Update
      </button>
    )}

<button onClick={()=>{handleDeleteNote(note._id)}}>delete</button>
        </div>
      ))}
 
        
        </div>
        
        
        </>
  )
}

export default App
