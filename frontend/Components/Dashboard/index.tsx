"use client";
import { CartListItem } from "@/types/cartType";
import React, { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

const statusColors: Record<CartListItem["status"], string> = {
  New: "bg-blue-500",
  Qualified: "bg-purple-500",
  Proposal: "bg-orange-500",
  Contacted: "bg-yellow-500",
  Won: "bg-green-500",
};

const Dashboard = () => {
  const [leadsData, setLeadsData] = useState<CartListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const [selectedStatus, setSelectedStatus] = useState<
    CartListItem["status"] | "All Status"
  >("All Status");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All Status");
  /* ============================================
     FETCH DATA (ALL + FILTER)
  ============================================ */
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        let url = "http://localhost:3030/cart-list";

        if (selectedStatus !== "All Status") {
          url = `http://localhost:3030/cart-list/filter?status=${selectedStatus}`;
        }

        const res = await fetch(url);
        const data: CartListItem[] = await res.json();
        setLeadsData(data);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [selectedStatus]);
  const handleFilterChange = async (status: string) => {
    setFilterStatus(status);

    try {
      const res = await fetch(
        `http://localhost:3030/cart-list/filter?status=${encodeURIComponent(status)}`,
      );
      const data: CartListItem[] = await res.json();
      setLeadsData(data);
    } catch (err) {
      console.error(err);
    }
  };
  /* ============================================
     UPDATE STATUS
  ============================================ */
  const handleStatusChange = async (
    id: number,
    newStatus: CartListItem["status"],
  ) => {
    try {
      const res = await fetch(`http://localhost:3030/cart-list/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Dropdown-u bağla
      setOpenDropdownId(null);

      // Filter aktivdirsə backend-dən yenidən fetch et
      if (selectedStatus && selectedStatus !== "All Status") {
        const filterRes = await fetch(
          `http://localhost:3030/cart-list/filter?status=${encodeURIComponent(
            selectedStatus,
          )}`,
        );
        const filteredData: CartListItem[] = await filterRes.json();
        setLeadsData(filteredData);
      } else {
        // All Status üçün local update
        const updatedLead: CartListItem = await res.json();
        setLeadsData((prev) =>
          prev.map((lead) =>
            lead.id === id ? { ...lead, status: updatedLead.status } : lead,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
        {/* ================= HEADER ================= */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Lead Pipeline</h2>
            <p className="text-sm text-gray-500">
              Manage your leads and track their progress
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
            </div>

            {/* FILTER DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <FiFilter />
                <span>{selectedStatus}</span>
                <FiChevronDown
                  className={`transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-100">
                  {/* All Status */}
                  <div
                    onClick={() => {
                      setSelectedStatus("All Status");
                      setIsFilterOpen(false);
                    }}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    All Status
                  </div>

                  {/* Status List */}
                  {(Object.keys(statusColors) as CartListItem["status"][]).map(
                    (status) => (
                      <div
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setIsFilterOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${statusColors[status]}`}
                        ></div>
                        {status}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="">
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

                  {/* STATUS COLUMN */}
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === lead.id ? null : lead.id,
                        )
                      }
                      className="flex items-center  justify-between w-32 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-xs font-medium text-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${statusColors[lead.status]}`}
                        ></div>
                        <span>{lead.status}</span>
                      </div>
                      <FiChevronDown className="text-gray-400 text-xs" />
                    </button>

                    {openDropdownId === lead.id && (
                      <div className="absolute mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        {(
                          Object.keys(statusColors) as CartListItem["status"][]
                        ).map((status) => (
                          <div
                            key={status}
                            onClick={() => handleStatusChange(lead.id, status)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${statusColors[status]}`}
                            ></div>
                            {status}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 font-bold text-sm text-gray-800">
                    ${lead.value}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 border border-gray-200 rounded-full text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      {lead.source}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(lead.created_at).toLocaleDateString()}
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
