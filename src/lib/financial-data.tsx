
import { useData } from "../context/DataWrapper"
import { normalizeRecommendationData } from "../utils/normalisedData"

type TableType = {
  header: string
  table_header: string[]
  table_values: string[][]
  table_data?: string[][]
}

type BoxAType = {
  header: string
  data: Record<string, string>
}

type BasicInfoType = {
  type: "Basic Info"
  customer_info: {
    basicInfo: {
    boxA: BoxAType
    table: TableType
    boxB:BoxAType
    boxC:BoxAType
  }
}
}

// type AssetsType = {
//   type: "Assets"
//   customer_info: {
//     assets: {
//     boxA: {
//       header: string
//       sub_header: string
//       sub_header_data: string
//       text_area_header: string
//       text_area_value: string
//     }
//     boxB: {
//       header: string
//       text_area_headerA: string
//       text_area_headerB: string
//       text_area_valueA: string
//       text_area_valueB: string
//     }
//     table: TableType
//   }
// }
// }

// =========================
// Basic Info renderer
// =========================
const renderBasicInfo = (info: BasicInfoType["customer_info"]) => {
  const { boxA, table, boxB, boxC } = info?.basicInfo
  console.log(info, " Basic Info info is here")

  const colCount = table.table_header.length
  const colClass =
    colCount === 1 ? "grid-cols-1" :
    colCount === 2 ? "grid-cols-2" :
    colCount === 3 ? "grid-cols-3" :
    colCount === 4 ? "grid-cols-4" :
    colCount === 5 ? "grid-cols-5" : "grid-cols-6"

  // helper for rendering a box with optional key order
  const renderBox = (box: BoxAType, order?: string[]) => {
    const entries = order
      ? order.map(key => [key, box.data[key]])
      : Object.entries(box.data)

    return `
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${box.header}</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300 text-sm text-gray-700">
            <tbody>
              ${entries
                .map(
                  ([key, value]) => `
                    <tr class="border-b border-gray-200">
                      <td class="px-4 py-2 font-medium text-gray-800 w-1/3">${key}</td>
                      <td class="px-4 py-2 text-gray-900">${value ?? "-"}</td>
                    </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `
  }

  return `
    <div class="space-y-6">
      <!-- Box A -->
      ${renderBox(boxA)}

      <!-- Family Structure -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${table.header}</h3>
        <div class="grid ${colClass} gap-2 text-sm text-gray-700 font-medium">
          ${table.table_header.map((h: string) => `<div>${h}</div>`).join("")}
        </div>
        ${(table.table_data ?? [])
          .map(
            (row: string[]) => `
              <div class="grid ${colClass} gap-2 text-sm mt-1">
                ${row.map((cell: string) => `<div>${cell}</div>`).join("")}
              </div>`
          )
          .join("")}
      </div>

      <!-- Box B -->
      ${renderBox(boxB)}

      <!-- Box C -->
      ${renderBox(boxC)}
    </div>
  `
}



const healthProfile = (info: any) => {
  console.log(info)
  const { boxA, boxB, table } = info?.HealthProfile

  const colCount = table.table_header.length
  const colClass =
    colCount === 1 ? "grid-cols-1" :
    colCount === 2 ? "grid-cols-2" :
    colCount === 3 ? "grid-cols-3" :
    colCount === 4 ? "grid-cols-4" :
    colCount === 5 ? "grid-cols-5" : "grid-cols-6"

  // 🔹 renderBox now in a proper 2-column table layout
  const renderBox = (box: any) => `
    <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">${box.header}</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 text-sm text-gray-700">
          <tbody>
            ${Object.entries(box.data)
              .map(
                ([key, value]) => `
                  <tr class="border-b border-gray-200">
                    <td class="px-4 py-2 font-medium text-gray-800 w-1/3">${key}</td>
                    <td class="px-4 py-2 text-gray-900">${value || "-"}</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `

  return `
    <div class="space-y-6">
      <!-- LifeStyle & Habits -->
      ${renderBox(boxA)}

      <!-- Medical History -->
      ${renderBox(boxB)}

      <!-- Insurance & Claim History -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${table.header}</h3>
        <div class="grid ${colClass} gap-2 text-sm text-gray-700 font-medium">
          ${table.table_header.map((h: string) => `<div>${h}</div>`).join("")}
        </div>
        ${(table.table_data ?? [])
          .map(
            (row: string[]) => `
              <div class="grid ${colClass} gap-2 text-sm mt-1">
                ${row.map((cell: string) => `<div>${cell || "-"}</div>`).join("")}
              </div>`
          )
          .join("")}
      </div>
    </div>
  `
}


// =========================
// Recommendations renderer
// =========================
const renderRecommendations = (info = [], selectedReco:any =[]) => {
  console.log(info, "Recommendations info is here");

  // STEP 1: Pehle plain info ko filter karo
  const filteredInfo = info.filter((rec:any) =>
    selectedReco.includes(rec?.planName?.value)
  );

  console.log(filteredInfo, "Filtered Info");

  // STEP 2: Ab sirf filtered info ko normalize me feed karo
  const listRaw = filteredInfo.map((item) =>
    normalizeRecommendationData(item)
  );

  const list = Array.isArray(listRaw) ? listRaw : [listRaw].filter(Boolean);

  console.log(list, "Normalized & Filtered Recommendations");

  // STEP 3: Render karein
  return `
    <div class="space-y-6">
      ${list
        .map(
          (rec:any) => `
          <div class="bg-white p-6 rounded-lg border border-gray-300 space-y-6 shadow-sm">

            <!-- TOP BASIC INFO -->
            <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div class="divide-y divide-gray-200">
                
                <div class="flex justify-between items-center py-3">
                  <p class="text-gray-600 font-medium">${
                    rec.planName?.heading || "Plan Name"
                  }</p>
                  <p class="text-gray-900 text-lg font-semibold">${
                    rec.planName?.value || "N/A"
                  }</p>
                </div>

                <div class="flex justify-between items-center py-3">
                  <p class="text-gray-600 font-medium">${
                    rec.sumInsured?.heading || "Sum Insured"
                  }</p>
                  <p class="text-gray-900 text-lg font-semibold">₹${
                    rec.sumInsured?.value?.toLocaleString?.() || "-"
                  }</p>
                </div>

                <div class="flex justify-between items-center py-3 border-b border-gray-300">
                  <p class="text-gray-600 font-medium">${
                    rec.premium?.heading || "Premium"
                  }</p>
                  <p class="text-green-600 text-lg font-semibold">₹${
                    rec.premium?.value?.toLocaleString?.() || "-"
                  }</p>
                </div>

                ${
                  rec.tenure
                    ? `
                <div class="flex justify-between items-center py-3">
                  <p class="text-gray-600 font-medium">${rec.tenure.heading}</p>
                  <p class="text-gray-900 text-lg font-semibold">${rec.tenure.value}</p>
                </div>`
                    : ""
                }

                ${
                  rec.company
                    ? `
                <div class="flex justify-between items-center py-3 border-b border-gray-300">
                  <p class="text-gray-600 font-medium">${rec.company.heading}</p>
                  <p class="text-gray-900 text-lg font-semibold">${rec.company.value}</p>
                </div>`
                    : ""
                }
              </div>
            </div>

            <!-- REASON -->
            ${
              rec?.reason
                ? `
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">${rec.reason.heading}</h4>
              <ul class="list-none pl-6 space-y-1 text-gray-700 leading-relaxed">
                ${rec.reason.value
                  .split("\\n")
                  .map(
                    (line:any) =>
                      `<li>${line.replace(/^-\\s*/, "").trim()}</li>`
                  )
                  .join("")}
              </ul>
            </div>`
                : ""
            }

            <!-- KEY FEATURES -->
            ${
              rec?.keyFeatures?.value?.length
                ? `
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">${rec.keyFeatures.heading}</h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${rec.keyFeatures.value
                  .map(
                    (f:any) => `
                    <div class="p-4 rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
                      <p class="font-medium text-gray-900">${f.name}</p>
                      <p class="text-sm text-gray-700">${f.desc}</p>
                    </div>`
                  )
                  .join("")}
              </div>
            </div>`
                : ""
            }

            <!-- RIDERS -->
            ${
              rec?.riders?.value?.length
                ? `
            <div>
              <h4 class="text-lg font-semibold text-gray-900 mb-2">${rec.riders.heading}</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${rec.riders.value
                  .map(
                    (r:any) => `
                    <div class="p-4 rounded-lg border shadow-sm ${
                      r.include
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }">
                      <p class="font-medium ${
                        r.include ? "text-green-700" : "text-red-700"
                      }">${r.name}</p>
                      <p class="text-sm ${
                        r.include ? "text-green-600" : "text-red-600"
                      }">${r.desc}</p>
                    </div>`
                  )
                  .join("")}
              </div>
            </div>`
                : ""
            }

          </div>
        `
        )
        .join("")}
    </div>
  `;
};











// =========================
// Main function
// =========================
export const getFinancialContent = (section: string, customer_info: any[]): string => {
  const { selectedReco } = useData();
  if (!customer_info || customer_info.length === 0) {
    return "<p class='text-gray-500'>No data available</p>"
  }

  switch (section) {
    case "basicInfo":
      const basicInfo = customer_info.find((x: any) => x.type === "Basic Info")
      return basicInfo ? renderBasicInfo(basicInfo.customer_info) : "<p class='text-gray-500'>Basic info not found</p>"
    
      case "healthProfile":
      const assets = customer_info.find((x: any) => x.type === "Health Profile")
      return assets ? healthProfile(assets.customer_info) : "<p class='text-gray-500'>Assets info not found</p>"
    // case "liabilities":
    //   const liabilities = customer_info.find((x: any) => x.type === "Liabilities")
    //   return liabilities ? renderLiabilities(liabilities.customer_info) : "<p class='text-gray-500'>Liabilities info not found</p>"

    // case "financialGoals":
    //   const goals = customer_info.find((x: any) => x.type === "Financial Goals")
    //   return goals ? renderFinancialGoals(goals.customer_info.financialGoals) : "<p class='text-gray-500'>Financial goals not found</p>"

    // case "planSummary":
    //   const summary = customer_info.find((x: any) => x.type === "Plan Summary")
    //   return summary ? renderPlanSummary(summary.customer_info.planSummary) : "<p class='text-gray-500'>Plan summary not found</p>"

    case "recommendation":
      const recs = customer_info.find((x: any) => x.type === "Recommendations")
      return recs ? renderRecommendations(recs.customer_info.Recommendations,selectedReco) : "<p class='text-gray-500'>Recommendations not found</p>"

    default:
      return "<p class='text-gray-500'>Section not found</p>"
  }
}
