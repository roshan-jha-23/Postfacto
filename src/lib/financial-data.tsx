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
  console.log(info)

  const colCount = table.table_header.length
  const colClass =
    colCount === 1 ? "grid-cols-1" :
    colCount === 2 ? "grid-cols-2" :
    colCount === 3 ? "grid-cols-3" :
    colCount === 4 ? "grid-cols-4" :
    colCount === 5 ? "grid-cols-5" : "grid-cols-6"

  // helper for rendering a box
  const renderBox = (box: BoxAType) => `
    <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">${box.header}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${Object.entries(box.data)
          .map(
            ([key, value]) => `
              <div>
                <p class="font-medium text-gray-700">${key}</p>
                <p class="text-gray-900">${value}</p>
              </div>`
          )
          .join("")}
      </div>
    </div>
  `

  return `
    <div class="space-y-6">
      <!-- Client Info -->
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

  const renderBox = (box: any) => `
    <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">${box.header}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${Object.entries(box.data)
          .map(
            ([key, value]) => `
              <div>
                <p class="font-medium text-gray-700">${key}</p>
                <p class="text-gray-900">${value || "-"}</p>
              </div>`
          )
          .join("")}
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
        ${table.table_data
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
const renderRecommendations = (info: any[]) => {
  console.log(info, "Recommendations info is here")
   const list = Array.isArray(info) ? info : [info] 

  return `
    <div class="space-y-6">
      ${list
        .map(
          (rec: any) => `
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6">
            
            <!-- Plan Card -->
            <!-- Plan Card -->
<div class="flex justify-between items-center bg-white p-5 rounded-xl shadow border border-gray-200">
  <div>
    <h3 class="text-lg font-semibold text-gray-800 capitalize">Plan Name:${rec.planName}</h3>
    <p class="text-gray-700 mt-1">
      Sum Insured: <span class="font-medium">₹${rec.sumInsured.toLocaleString()}</span>
    </p>
  </div>
  <div class="text-right">
    <p class="text-gray-700">Annual Premium</p>
    <p class="text-lg font-semibold text-green-600">₹${rec.premium.toLocaleString()}</p>
  </div>
</div>

            <!-- Reasons -->
            <div>
              <h4 class="text-lg font-semibold text-gray-800 mb-2">Reason</h4>
              <ul class="list-disc pl-5 space-y-1 text-gray-700">
                ${rec.reason
                  .split("\n")
                  .map((line: string) => `<li>${line.replace(/^- /, "")}</li>`)
                  .join("")}
              </ul>
            </div>

            <!-- Riders -->
            <div>
              <h4 class="text-lg font-semibold text-gray-800 mb-2">Riders</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${rec.riders
                  .map(
                    (r: any) => `
                    <div class="p-4 rounded-lg border shadow-sm ${
                      r.include ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
                    }">
                      <p class="font-medium ${
                        r.include ? "text-green-800" : "text-red-800"
                      }">${r.name}</p>
                      <p class="text-sm ${
                        r.include ? "text-green-700" : "text-red-700"
                      }">${r.desc}</p>
                    </div>`
                  )
                  .join("")}
              </div>
            </div>

          </div>`
        )
        .join("")}
    </div>
  `
}



// =========================
// Main function
// =========================
export const getFinancialContent = (section: string, customer_info: any[]): string => {
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
      return recs ? renderRecommendations(recs.customer_info.Recommendations) : "<p class='text-gray-500'>Recommendations not found</p>"

    default:
      return "<p class='text-gray-500'>Section not found</p>"
  }
}
