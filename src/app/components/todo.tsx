'use client'

import { useState } from 'react'
import { Plus, Trash2, Check, X } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Todo App</h1>
          <form onSubmit={addTodo} className="flex mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="flex-grow px-4 py-2 text-gray-700 bg-gray-200 rounded-l-lg focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
            >
              <Plus className="h-5 w-5" />
            </button>
          </form>
          <ul className="divide-y divide-gray-200">
            {todos.map(todo => (
              <li key={todo.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`mr-2 flex-shrink-0 h-5 w-5 rounded-full border-2 ${
                      todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
                    }`}
                  >
                    {todo.completed && <Check className="h-4 w-4 text-white" />}
                  </button>
                  <span className={`text-gray-800 ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm text-gray-500">
            {todos.length} {todos.length === 1 ? 'todo' : 'todos'} ({todos.filter(t => t.completed).length} completed)
          </div>
        </div>
      </div>
    </div>
  )
}