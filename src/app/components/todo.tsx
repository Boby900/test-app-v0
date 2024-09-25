"use client"
import { Plus } from 'lucide-react';

export default function TodoApp() {

    function handleClick(){
        console.log("button has been clicked")}
    return (
        <div className="flex items-center justify-center p-2 m-2">
            <form className="flex items-center gap-2 bg-white rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Your todos"
                    className="flex-grow p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    type="submit"
                    onClick={handleClick}
                    className="p-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}
