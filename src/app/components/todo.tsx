//add the authentication and it should render the data as per the logged in user's localStorage
//for non logged in users it should not persist the data
"use client";
import { useSession } from "next-auth/react";
import { Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";
export default function TodoApp() {

  const data = useSession();
  console.log(data)

  const [todo, setTodo] = useState(() => {
    const savedTodo = localStorage.getItem("todos");
    return savedTodo ? JSON.parse(savedTodo) : [];
  });

  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.name.value;
    setTodo((prevTodo) => [...prevTodo, value]);
    e.target.reset();
  }

  useEffect(() => {
    let data = localStorage.getItem("todos");
    if (data) {
      setTodo(JSON.parse(data));
   
    }
  }, []); // Run whenever 'todo' changes

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]); // Run whenever 'todo' changes

  function handleDelete(id) {
    setTodo((prevTodo) => prevTodo.filter((_, index) => index !== id));
    console.log("deleted");
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
                <div>{item}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <Trash className="w-5 h-5" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
