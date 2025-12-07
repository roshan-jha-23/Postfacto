"use client";

import { ThumbsUp, TrendingUp } from "lucide-react";
import { ScoreItem } from "./score-item";
import { useData } from "../context/DataWrapper";

export function PerformanceReview() {
  const { performanceData } = useData();

  if (!performanceData) return null; // safety

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-6">Performance Review</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Score List Section */}
        <div className="w-full lg:w-1/3 flex-shrink-0 border-r-0 lg:border-r border-slate-100 pr-0 lg:pr-8">
          {/* Overall Score Block */}
          <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              Overall Score
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-indigo-700">
                {performanceData.overallScore}
              </span>
              <span className="text-lg text-indigo-400 font-medium">/100</span>
            </div>
          </div>

          <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wide">
            Parameter Breakdown
          </h3>

          <div className="space-y-4">
            {performanceData.breakdown?.map((item:any, index:any) => (
              <ScoreItem
                key={index}
                label={item.label}
                score={item.score}
                maxScore={item.maxScore}
                color={item.color}
              />
            ))}
          </div>
        </div>

        {/* Insights Section */}
        <div className="flex-1 grid grid-cols-1 gap-4">
          {/* Top Strengths */}
          <div className="flex flex-col bg-green-50/50 rounded-lg border border-green-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-green-100 rounded text-green-700">
                <ThumbsUp className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-green-900">Top Strengths</h3>
            </div>

            <ul className="list-disc list-outside ml-4 text-sm text-green-800 space-y-2">
              {performanceData.strengths?.map((point:any, i:any) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="flex flex-col bg-amber-50/50 rounded-lg border border-amber-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-amber-100 rounded text-amber-700">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-amber-900">Areas for Improvement</h3>
            </div>

            <ul className="list-disc list-outside ml-4 text-sm text-amber-800 space-y-2">
              {performanceData.improvements?.map((point:any, i:any) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
