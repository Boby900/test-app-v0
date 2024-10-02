//React DnD library
//self host it
//edit functionality
"use client";

import { Plus, Trash, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession from next-auth

export default function TodoApp() {
  const { status } = useSession(); // Get session data to check if the user is logged in
  const [todo, setTodo] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<null|number>(); // Tracks the todo being edited
  const [editText, setEditText] = useState(""); // Temporary state for new text
  
  // Load todos from localStorage only if the user is logged in
  useEffect(() => {
    if (status === "authenticated" && typeof window !== "undefined") {
      const savedTodo = localStorage.getItem("todos");
      if (savedTodo) {
        setTodo(JSON.parse(savedTodo));
      }
    }
  }, [status]);

  // Save todos to localStorage only if the user is logged in
  useEffect(() => {
    if (status === "authenticated" && typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [todo, status]);

  function handleSubmit(e: any) {
    e.preventDefault();
    const value = e.target.elements.name.value;
    setTodo((prevTodo) => [...prevTodo, value]);
    e.target.reset();
  }

  function handleDelete(id: number) {
    setTodo((prevTodo) => prevTodo.filter((_, index) => index !== id));
  }
  
  function handleEdit(id: number) {
    const todoToEdit = todo[id]
    setIsEditing(id)
    setEditText(todoToEdit)
    console.log("...editing",todoToEdit)
  }
  function saveEdit() {
    const updatedTodos = todo.map((item, index) =>
  index === isEditing ? editText : item
    );
    setTodo(updatedTodos);
    setIsEditing(null);
    setEditText(""); // Clear the edit text state
  }
 
  return (
    <div
      onSubmit={handleSubmit}
      className="items-center justify-center p-2 m-2"
    >
      <form className="flex items-center gap-2 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Your todos"
          name="name"
          className="flex-grow p-2 border border-gray-300 text-black rounded-md"
        />
        <button
          type="submit"
          className="p-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      <div className="w-full mt-4">
        <ul>
          {todo.map((item, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
               <div className="flex justify-between p-2 m-2">
                {isEditing === index ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={saveEdit}
                      className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>{item}</div>
                )}
                <div className="flex gap-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleEdit(index)}
                  >
                    <Pencil className="w-5 h-5" />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
