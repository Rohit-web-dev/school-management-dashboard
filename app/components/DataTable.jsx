"use client";
import { useState, useMemo } from "react";

export default function DataTable({ data, onRowClick }) {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const rowsPerPage = 6;

  // SEARCH + SORT + PAGINATION
  const filteredData = useMemo(() => {
    let filtered = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        const A = a[sortColumn];
        const B = b[sortColumn];

        if (A < B) return sortOrder === "asc" ? -1 : 1;
        if (A > B) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, sortColumn, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pageData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSort = (col) => {
    if (sortColumn === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col);
      setSortOrder("asc");
    }
  };

  return (
    <div className="mt-3">
      {/* SEARCH */}
      <input
        placeholder="Search student..."
        className="px-3 py-2 border border-gray-300 rounded w-full mb-3"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID {sortColumn === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>

            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name{" "}
              {sortColumn === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>

            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => handleSort("class")}
            >
              Class{" "}
              {sortColumn === "class" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>

            <th
              className="p-3 text-left cursor-pointer"
              onClick={() => handleSort("roll")}
            >
              Roll{" "}
              {sortColumn === "roll" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>

        <tbody>
          {pageData.length > 0 ? (
            pageData.map((student) => (
              <tr
                key={student.id}
                className="border-b hover:bg-gray-50 cursor-pointer border-gray-300"
                onClick={() => onRowClick(student)}
              >
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.class}</td>
                <td className="p-3">{String(student.roll).padStart(3, "0")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No result found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-100"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="text-sm font-medium">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:bg-gray-100"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
