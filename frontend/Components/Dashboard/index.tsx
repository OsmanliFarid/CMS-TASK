import React from "react";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

const leadsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@techcorp.com",
    company: "TechCorp Solutions",
    status: "Qualified",
    statusColor: "bg-purple-500",
    value: "$45.000",
    source: "Website",
    date: "15.01.2024",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@startupx.com",
    company: "StartupX",
    status: "Proposal",
    statusColor: "bg-orange-500",
    value: "$28.000",
    source: "Referral",
    date: "14.01.2024",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily@bigcompany.com",
    company: "Big Company Inc",
    status: "New",
    statusColor: "bg-blue-500",
    value: "$75.000",
    source: "LinkedIn",
    date: "13.01.2024",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@innovate.io",
    company: "Innovate Labs",
    status: "Contacted",
    statusColor: "bg-yellow-500",
    value: "$32.000",
    source: "Cold Email",
    date: "12.01.2024",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa@growth.co",
    company: "Growth Co",
    status: "Won",
    statusColor: "bg-green-500",
    value: "$55.000",
    source: "Website",
    date: "10.01.2024",
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Hissəsi */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Lead Pipeline</h2>
            <p className="text-sm text-gray-500">
              Manage your leads and track their progress through the sales
              funnel
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Axtarış Paneli */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
            </div>
            {/* Filtr Düyməsi */}
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors">
              <FiFilter />
              <span>All Status</span>
              <FiChevronDown />
            </button>
          </div>
        </div>

        {/* Cədvəl Hissəsi */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-sm font-medium">
                <th className="px-6 py-4 font-semibold text-gray-700">Lead</th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Company
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">Value</th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Source
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leadsData.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">
                        {lead.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {lead.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {lead.company}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-between w-32 px-3 py-1.5 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${lead.statusColor}`}
                        ></div>
                        <span className="text-xs font-medium text-gray-700">
                          {lead.status}
                        </span>
                      </div>
                      <FiChevronDown className="text-gray-400 text-xs" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-gray-800">
                    {lead.value}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 border border-gray-200 rounded-full text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {lead.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
