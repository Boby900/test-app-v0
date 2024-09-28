'use client'
import { signIn } from "next-auth/react"
import { Github } from 'lucide-react'

export default function AuthComponent() {

  return (
    <div className="min-h-screen flex  justify-center bg-gray-900 py-8 px-8 sm:px-8 lg:px-8">
      <div className="max-w-md w-full space-y-2">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <div>
          <button
          onClick={() => signIn("github",{ redirectTo: "/" })}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700"
          >
            <Github className="w-5 h-5 mr-2" aria-hidden="true" />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
