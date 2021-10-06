import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note Created successfully", "success");
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add your daily journal</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title{" "}
            <span className="text-danger">
              (Min. length should be 5 characters)
            </span>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={handleChange}
            required
            value={note.title}
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description{" "}
            <span className="text-danger">
              (Min. length should be 5 characters)
            </span>
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            required
            value={note.description}
            row="3"
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label fw-bold">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
            required
            value={note.tag}
            minLength={5}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
