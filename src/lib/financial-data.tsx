type TableType = {
  header: string
  table_header: string[]
  table_values: string[][]
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
  }
}
}

type AssetsType = {
  type: "Assets"
  customer_info: {
    assets: {
    boxA: {
      header: string
      sub_header: string
      sub_header_data: string
      text_area_header: string
      text_area_value: string
    }
    boxB: {
      header: string
      text_area_headerA: string
      text_area_headerB: string
      text_area_valueA: string
      text_area_valueB: string
    }
    table: TableType
  }
}
}

// =========================
// Basic Info renderer
// =========================
const renderBasicInfo = (info: BasicInfoType["customer_info"]) => {
  const { boxA, table } = info?.basicInfo
  console.log(info)
  const data = boxA.data

  const colCount = table.table_header.length
  const colClass =
    colCount === 1 ? "grid-cols-1" :
    colCount === 2 ? "grid-cols-2" :
    colCount === 3 ? "grid-cols-3" :
    colCount === 4 ? "grid-cols-4" :
    colCount === 5 ? "grid-cols-5" : "grid-cols-6"

  return `
    <div class="space-y-6">
      <!-- Client Info -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${boxA.header}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${Object.entries(data)
            .map(
              ([key, value]: [any,any]) => `
              <div>
                <p class="font-medium text-gray-700">${key}</p>
                <p class="text-gray-900">${value}</p>
              </div>`
            )
            .join("")}
        </div>
      </div>

      <!-- Family Structure -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${table.header}</h3>
        <div class="grid ${colClass} gap-2 text-sm text-gray-700 font-medium">
          ${table.table_header.map((h: string) => `<div>${h}</div>`).join("")}
        </div>
        ${table.table_values
          .map(
            (row: string[]) => `
            <div class="grid ${colClass} gap-2 text-sm mt-1">
              ${row.map((cell: string) => `<div>${cell}</div>`).join("")}
            </div>`
          )
          .join("")}
      </div>
    </div>
  `
}

const renderAssets = (info: AssetsType["customer_info"]) => {
  console.log(info)
  const { boxA, boxB, table } = info?.assets

  return `
    <div class="space-y-6">
      <!-- Income and Savings -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${boxA.header}</h3>
        <div class="space-y-4">
          <div>
            <p class="font-medium text-gray-700">${boxA.sub_header}</p>
            <p class="text-xl font-bold text-green-600">${boxA.sub_header_data}</p>
          </div>
          <div>
            <p class="font-medium text-gray-700 mb-2">${boxA.text_area_header}</p>
            <div class="bg-white p-3 rounded border">
              <pre class="text-sm text-gray-800 whitespace-pre-wrap">${boxA.text_area_value}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Investments and Other Assets -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${boxB.header}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="font-medium text-gray-700 mb-2">${boxB.text_area_headerA}</p>
            <div class="bg-white p-3 rounded border">
              <pre class="text-sm text-gray-800 whitespace-pre-wrap">${boxB.text_area_valueA}</pre>
            </div>
          </div>
          <div>
            <p class="font-medium text-gray-700 mb-2">${boxB.text_area_headerB}</p>
            <div class="bg-white p-3 rounded border">
              <pre class="text-sm text-gray-800 whitespace-pre-wrap">${boxB.text_area_valueB}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Existing Life Insurance -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${table.header}</h3>
        <div class="grid grid-cols-${table.table_header.length} gap-2 text-sm text-gray-700 font-medium">
          ${table.table_header.map((h: string) => `<div>${h}</div>`).join("")}
        </div>
        ${table.table_values
          .map(
            (row: string[]) => `
            <div class="grid grid-cols-${table.table_header.length} gap-2 text-sm mt-1">
              ${row.map((cell: string) => `<div>${cell}</div>`).join("")}
            </div>`
          )
          .join("")}
      </div>
    </div>
  `
}

// =========================
// Liabilities renderer
// =========================
const renderLiabilities = (info: any) => {
  console.log(info)
  const { boxA, boxB, table } = info?.liabilities

  return `
    <div class="space-y-6">
      <!-- Monthly Outflow -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${boxA.header}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${Object.entries(boxA.data)
            .map(
              ([key, value]: [any,any]) => `
              <div>
                <p class="font-medium text-gray-700">${key}</p>
                <p class="text-gray-900">${value}</p>
              </div>`
            )
            .join("")}
        </div>
      </div>

      <!-- Home Loan Details -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${boxB.header}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${Object.entries(boxB.data)
            .map(
              ([key, value]: [any,any]) => `
              <div>
                <p class="font-medium text-gray-700">${key}</p>
                <p class="text-gray-900">${value}</p>
              </div>`
            )
            .join("")}
        </div>
      </div>

      <!-- Other Loans -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">${table.header}</h3>
        <div class="grid grid-cols-${table.table_header.length} gap-2 text-sm text-gray-700 font-medium">
          ${table.table_header.map((h: string) => `<div>${h}</div>`).join("")}
        </div>
        ${table.table_values
          .map(
            (row: string[]) => `
            <div class="grid grid-cols-${table.table_header.length} gap-2 text-sm mt-1">
              ${row.map((cell: string) => `<div>${cell}</div>`).join("")}
            </div>`
          )
          .join("")}
      </div>
    </div>
  `
}

// =========================
// Financial Goals renderer
// =========================
const renderFinancialGoals = (info: any[]) => {
  return `
    <div class="space-y-6">
      ${info
        .map(
          (goal: any) => `
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">${goal.header}</h3>
            <p class="text-gray-700 mb-4">${goal.sub_header}</p>
            <div class="grid grid-cols-2 gap-4">
              ${Object.entries(goal.cols)
                .map(
                  ([key, value]: [any,any]) => `
                  <div>
                    <p class="font-medium text-gray-700">${key}</p>
                    <p class="text-gray-900">${value}</p>
                  </div>`
                )
                .join("")}
            </div>
          </div>`
        )
        .join("")}
    </div>
  `
}

// =========================
// Plan Summary renderer
// =========================
const renderPlanSummary = (info: any[]) => {
  return `
    <div class="space-y-6">
      ${info
        .map(
          (plan: any) => `
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">${plan.header}</h3>
            ${plan.sub_header ? `<p class="text-gray-700 mb-2">${plan.sub_header}</p>` : ""}
            <div class="grid grid-cols-2 gap-4">
              ${Object.entries(plan.cols || {})
                .map(
                  ([key, value]: [any,any]) => `
                  <div>
                    <p class="font-medium text-gray-700">${key}</p>
                    <p class="text-gray-900">${value}</p>
                  </div>`
                )
                .join("")}
            </div>
            ${plan.reason ? `<div class="mt-4">${plan.reason}</div>` : ""}
            ${plan.text_area_value ? `<p class="mt-2 text-gray-700">${plan.text_area_value}</p>` : ""}
          </div>`
        )
        .join("")}
    </div>
  `
}

// =========================
// Recommendations renderer
// =========================
const renderRecommendations = (info: any[]) => {
  return `
    <div class="space-y-6">
      ${info
        .map(
          (rec: any) => `
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">${rec.header}</h3>
            <p class="text-gray-700 mb-2">${rec.sub_header}</p>
            <p class="text-sm text-gray-500 mb-4">${rec.reason}</p>
            <div class="grid grid-cols-2 gap-4">
              ${Object.entries(rec.cols || {})
                .map(
                  ([key, value]: [any, any]) => `
                  <div>
                    <p class="font-medium text-gray-700">${key}</p>
                    <p class="text-gray-900">${value ?? "-"}</p>
                  </div>`
                )
                .join("")}
            </div>
            ${rec.text_area_value ? `<p class="mt-2 text-gray-700">${rec.text_area_value}</p>` : ""}
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
    case "assets":
      const assets = customer_info.find((x: any) => x.type === "Assets")
      return assets ? renderAssets(assets.customer_info) : "<p class='text-gray-500'>Assets info not found</p>"
    case "liabilities":
      const liabilities = customer_info.find((x: any) => x.type === "Liabilities")
      return liabilities ? renderLiabilities(liabilities.customer_info) : "<p class='text-gray-500'>Liabilities info not found</p>"

    case "financialGoals":
      const goals = customer_info.find((x: any) => x.type === "Financial Goals")
      return goals ? renderFinancialGoals(goals.customer_info.financialGoals) : "<p class='text-gray-500'>Financial goals not found</p>"

    case "planSummary":
      const summary = customer_info.find((x: any) => x.type === "Plan Summary")
      return summary ? renderPlanSummary(summary.customer_info.planSummary) : "<p class='text-gray-500'>Plan summary not found</p>"

    case "recommendation":
      const recs = customer_info.find((x: any) => x.type === "Recommendations")
      return recs ? renderRecommendations(recs.customer_info.recommendations) : "<p class='text-gray-500'>Recommendations not found</p>"

    default:
      return "<p class='text-gray-500'>Section not found</p>"
  }
}
