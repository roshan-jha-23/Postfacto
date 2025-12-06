export function normalizeRecommendationData(rawData: any) {
  if (!rawData) return [];

  // If rawData is ARRAY → normalize each item
  if (Array.isArray(rawData)) {
    return rawData.map((item) => normalizeSingle(item));
  }

  // If rawData is OBJECT → normalize single
  return normalizeSingle(rawData);
}

// -----------------------
// NORMALIZE ONE OBJECT
// -----------------------
function normalizeSingle(raw: any) {
  if (!raw || typeof raw !== "object") return {};

  const keyMap: Record<string, string> = {
    planName: "planName",
    sumInsured: "sumInsured",
    premium: "premium",
    reason: "reason",
    riders: "riders",

    // Hindi
    "योजना का नाम": "planName",
    "बीमित राशि": "sumInsured",
    "प्रीमियम": "premium",
    "कारण": "reason",
    "राइडर्स": "riders",

    // Marathi
    "योजनेचे नाव": "planName",
    "विम्याची रक्कम": "sumInsured",
    "रायडर्स": "riders",

    // Bengali / Telugu
    "বীমার পরিমাণ": "sumInsured",
    "প্রিমিয়াম": "premium",
    "কারণ": "reason",
    "ప్రణాళిక పేరు": "planName",
  };

  const normalized: any = {};

  Object.keys(raw).forEach((key) => {
    const englishKey = keyMap[key] || key;
    normalized[englishKey] = raw[key];
  });

  // Default safe fields
  normalized.planName ??= { heading: "Plan Name", value: "N/A" };
  normalized.sumInsured ??= { heading: "Sum Insured", value: 0 };
  normalized.premium ??= { heading: "Premium", value: 0 };
  normalized.reason ??= { heading: "Reason", value: "" };
  normalized.riders ??= { heading: "Riders", value: [] };
  normalized.keyFeatures ??= { heading: "Key Features", value: [] };
  normalized.context_name ??= "";

  return normalized;
}
