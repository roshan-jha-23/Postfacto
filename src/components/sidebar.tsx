import { BarChart3, Users, Calendar, ClipboardList, BookOpen, LogOut } from "lucide-react"

export function Sidebar() {
  const navItems = [
    { icon: BarChart3, active: true },
    { icon: Users, active: false },
    { icon: Calendar, active: false },
    { icon: ClipboardList, active: false },
    { icon: BookOpen, active: false },
  ]

  return (
    <div className="hidden md:flex fixed left-0 top-0 w-18 min-h-screen bg-slate-800 text-slate-200 flex-col items-center pt-6 z-10">
      <div className="w-12 h-12 rounded-xl bg-gray-700 flex justify-center items-center text-lg font-bold text-white mb-6">
        V
      </div>

      <div className="flex-1 flex flex-col space-y-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`w-12 h-12 rounded-xl flex justify-center items-center cursor-pointer transition-colors duration-200 ${
              item.active ? "bg-violet-600" : "hover:bg-slate-600"
            }`}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>

      <button className="w-12 h-12 rounded-xl flex justify-center items-center hover:bg-slate-600 transition-colors duration-200 mb-6">
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  )
}
