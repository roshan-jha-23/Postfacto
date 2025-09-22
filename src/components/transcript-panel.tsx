import { Search } from "lucide-react"
import { useData } from "../context/DataWrapper"
import { useState } from "react"

interface TranscriptGroup {
  type: string
  transcript: string[]
}

export function TranscriptPanel() {
  const { transcription }: any = useData()
  const [query, setQuery] = useState("")

  // test auto-send after 5 sec


  const transcriptMessages: TranscriptGroup[] =
    transcription.length > 0
      ? transcription
      : [
          {
            type: "Basic Info",
            transcript: [
              "Hi, my name is Varun.",
              "I currently live in Hyderabad.",
              "I work as a software developer.",
            ],
          },
          {
            type: "Health Profile",
            transcript: ["I consume Alcohol Daily", "I have ADHD", "text3"],
          },
        ]

  const filteredMessages = transcriptMessages
    .map((group) => ({
      ...group,
      transcript: group.transcript.filter((line) =>
        line.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.transcript.length > 0)

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[550px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Transcript Available
        </h2>
        <div className="relative w-60">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transcript..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Transcript Section */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="flex flex-col gap-6">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((group, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-gray-700">{group.type}</h3>
                <div className="flex flex-col gap-2">
                  {group.transcript.map((line, idx) => (
                    <div
                      key={idx}
                      className={`px-4 py-2 rounded-lg text-sm leading-relaxed ${
                        group.type === "Basic Info"
                          ? "bg-blue-50 text-gray-800 self-start"
                          : "bg-green-50 text-gray-800 self-start"
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">No results found...</p>
          )}
        </div>
      </div>
    </div>
  )
}
