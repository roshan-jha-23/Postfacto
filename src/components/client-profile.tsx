

import { useData } from "../context/DataWrapper"




export function ClientProfile() {
   const {clientProfileData}=useData();
    return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Client Profile Snapshot</h2>
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Profile Complete</span>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
        <div>
          <p className="text-slate-500 mb-1">Product Pitch</p>
          <p className="font-semibold text-slate-900">{clientProfileData.productPitch}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Sum Assured</p>
          <p className="font-semibold text-slate-900">{clientProfileData.sumAssured}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Location</p>
          <p className="font-semibold text-slate-900">{clientProfileData.Location}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Family</p>
          <p className="font-semibold text-slate-900">{clientProfileData.Family}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Income/EMI</p>
          <p className="font-semibold text-slate-900">{clientProfileData.incomeEmi}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Lifestyle</p>
          <p className="font-semibold text-green-600">{clientProfileData.lifestyle}</p>
        </div>
      </div>
    </div>
  )
}
