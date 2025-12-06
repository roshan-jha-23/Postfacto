import { AudioPlayer } from "./audio-player";

export default function RightSide() {
  return (
    <div className="w-[500px] flex flex-col bg-white border-l border-slate-200 shadow-xl">
      
      {/* Media Player */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <h3 className="font-semibold text-slate-800 mb-3 text-sm px-2">
          Meeting Recording
        </h3>

        {/* Your Custom Audio Player */}
        <div className="px-2">
          <AudioPlayer />
        </div>
      </div>

      {/* Transcript Title */}
      <div className="flex border-b border-slate-200 px-6 py-3 bg-white">
        <h3 className="text-sm font-bold text-slate-800">Transcript</h3>
      </div>

      {/* Transcript Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Agent */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">A</div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Agent • 12:30</p>
            <p className="text-sm text-slate-700">
              So, regarding the coverage, this plan covers all hospitalization expenses...
            </p>
          </div>
        </div>

        {/* Client */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">C</div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Client • 12:32</p>
            <p className="text-sm text-slate-700">
              But I heard some plans have a waiting period...
            </p>
          </div>
        </div>

        {/* AI Cue */}
        <div className="relative pl-12">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-purple-200"></div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-xs mb-2">
            <div className="flex items-center gap-2 mb-1 text-purple-700 font-semibold">
              <i data-lucide="blocks" className="h-3 w-3"></i> AI Cue Generated
            </div>
            <p className="text-purple-800">Prompt: Explain waiting period (2 years)...</p>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="relative">
          <i data-lucide="search" className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search in transcript..."
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm 
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

    </div>
  );
}
