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
    <div className="space-y-8">
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
            <div className="space-y-4">
              {/* --- DESCRIPTION --- */}
              {sec.description?.trim() && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {sec.description}
                </p>
              )}

              {/* --- TAGS --- */}
              {sec.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {sec.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* --- CHECKS --- */}
              {sec.checks &&
                ((sec.checks.done?.length ?? 0) > 0 ||
                  (sec.checks.missed?.length ?? 0) > 0) && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                    {sec.checks.done?.map((c: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}

                    {sec.checks.missed?.map((c: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-400"
                      >
                        <div className="h-4 w-4 mt-0.5 rounded-full border border-slate-300" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                )}

              {/* --- CLIP --- */}
              {sec.clip &&
                (sec.clip.quote?.trim() || sec.clip.label?.trim()) && (
                  <div className="text-xs bg-slate-100 p-3 rounded-lg text-slate-500 italic border-l-4 border-indigo-400">
                    {sec.clip.quote}
                    {sec.clip.label?.trim() && (
                      <button className="ml-2 font-semibold not-italic text-indigo-600 hover:underline">
                        [{sec.clip.label}]
                      </button>
                    )}
                  </div>
                )}

              {/* --- AI TIP --- */}
              {sec.aiTip?.trim() && (
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <Lightbulb className="h-5 w-5 text-purple-600 mt-0.5" />
                  <p className="text-xs text-purple-800 leading-relaxed">
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