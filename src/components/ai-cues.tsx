import { useData } from "../context/DataWrapper";

interface AICuesProps {
  type: string;
}

export function AICues({ type }: AICuesProps) {
  console.log("Rendering AICues with type:", type);
  const { aiCues }: any = useData();
  console.log("AI Cues data from context:", aiCues);

  
  const selectedType = aiCues.find((item: any) => item.type === type);

  if (!selectedType) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 h-[550px] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">AI-Cues</h2>
        <p className="text-gray-500">No cues found for "{type}"</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[550px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">AI-Cues - {type}</h2>
      <div className="space-y-4">
        {selectedType.cues.map((cue: any) => (
          <div key={cue.id} className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium text-blue-700 mb-2">{cue.header}</p>
            {cue.data.map((d: any) => (
              <p key={d.id} className="text-gray-800 text-sm mb-1">
                • {d.text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

