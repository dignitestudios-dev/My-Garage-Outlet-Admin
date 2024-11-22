import React from 'react'
import ReportsTable from '../../components/reports/ReportsTable';

const Reports = () => {
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start bg-[#001229]">
        <h2 className="text-xl font-semibold text-gray-100">Reporting & Moderation</h2>

        <ReportsTable/>
    </div>
  )
}

export default Reports;