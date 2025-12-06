import "./App.css"
import { useState, useEffect } from "react"
import { InterviewDashboard } from "./components/interview-dashboard"
import DataWrapper from "./context/DataWrapper"
import ReduxProvider from "./redux/store/Providers"
import RightSide from "./components/RightSide"
// import { useAppSelector } from "./redux/store/store"

function App() {
  const [user, setUser] = useState<{ username: string; password: string } | null>(null)
  const [loading, setLoading] = useState(true)
 
    

  useEffect(() => {
    const saved = localStorage.getItem("postfacto_details")
    if (saved) {
      setUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const creds = { username, password }
    localStorage.setItem("postfacto_details", JSON.stringify(creds))
    setUser(creds)
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 w-80 flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold text-center">Enter your details</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Save & Continue
          </button>
        </form>
      </div>
    )
  }

  return (
    <ReduxProvider>
      <DataWrapper>
       <RightSide/>
      </DataWrapper>
    </ReduxProvider>
  )
}

export default App
