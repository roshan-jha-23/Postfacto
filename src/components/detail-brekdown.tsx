import { DetailSection } from "./detail-section";
import { useData } from "../context/DataWrapper";

import {
  BookOpen,
  Heart,
  Search,
  AlertCircle,
  Layers,
  ClipboardCheck,
  Lightbulb,
  CheckCircle2
} from "lucide-react";

const FIXED_ICONS: any = {
  "Product Knowledge": BookOpen,
  "Rapport Building": Heart,
  "Need Analysis": Search,
  "Objection Handling": AlertCircle,
  "Cross-Selling & Up-Selling": Layers,
  "Process Adherence": ClipboardCheck
};

export function DetailedBreakdown() {
  const { breakdownData } = useData();
  console.log("breakdownData:", breakdownData);

  return (
    <div className="space-y-6">
      {breakdownData?.sections?.map((sec: any, idx: number) => {
        const IconComp = FIXED_ICONS[sec.title] || BookOpen;

        return (
          <DetailSection
            key={idx}
            title={sec.title}
            subtitle={sec.subtitle}
            score={sec.score}
            icon={<IconComp className="h-5 w-5" />}
            iconBgColor={sec.iconBgColor}
          >
            <div>
              {/* --- DESCRIPTION --- */}
              {sec.description && sec.description.trim() !== "" && (
                <p className="text-sm text-slate-600 mb-3">{sec.description}</p>
              )}

              {/* --- TAGS --- */}
              {sec.tags && sec.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {sec.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* --- CHECKS (done + missed) --- */}
              {sec.checks &&
                ((sec.checks.done && sec.checks.done.length > 0) ||
                  (sec.checks.missed && sec.checks.missed.length > 0)) && (
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    {sec.checks.done?.map((c: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-slate-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {c}
                      </div>
                    ))}

                    {sec.checks.missed?.map((c: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-slate-400"
                      >
                        <div className="h-4 w-4 rounded-full border border-slate-300" />
                        {c}
                      </div>
                    ))}
                  </div>
                )}

              {/* --- CLIP (only if real content exists) --- */}
              {sec.clip &&
                ((sec.clip.quote &&
                  sec.clip.quote !== null &&
                  sec.clip.quote.trim() !== "") ||
                  (sec.clip.label &&
                    sec.clip.label !== null &&
                    sec.clip.label.trim() !== "")) && (
                  <div className="text-xs bg-slate-100 p-3 rounded text-slate-500 italic border-l-4 border-indigo-400">
                    {sec.clip.quote}

                    {sec.clip.label && sec.clip.label.trim() !== "" && (
                      <button className="font-semibold not-italic text-indigo-600 cursor-pointer hover:underline ml-2">
                        [{sec.clip.label}]
                      </button>
                    )}
                  </div>
                )}

              {/* --- AI TIP --- */}
              {sec.aiTip && sec.aiTip.trim() !== "" && (
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <Lightbulb className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-800">
                    <strong>AI Tip:</strong> {sec.aiTip}
                  </p>
                </div>
              )}
            </div>
          </DetailSection>
        );
      })}
    </div>
  );
}
