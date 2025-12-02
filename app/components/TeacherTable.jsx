import { useState, useMemo } from "react";

export default function TeacherTable({ teachers, onSelect }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  // Search logic
  const filtered = useMemo(() => {
    return teachers.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.section.includes(search)
    );
  }, [teachers, search]);

  // Sorting logic
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let A = a[sortField].toString().toLowerCase();
      let B = b[sortField].toString().toLowerCase();

      if (sortOrder === "asc") return A > B ? 1 : -1;
      return A < B ? 1 : -1;
    });
  }, [filtered, sortField, sortOrder]);

  const totalPages = Math.ceil(sorted.length / rowsPerPage);

  const paginated = sorted.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Sorting handler
  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search teacher..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border border-gray-300 p-2 rounded w-full mb-3"
      />

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort("name")}>
              Name
            </th>
            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort("subject")}>
              Subject
            </th>
            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort("section")}>
              Section
            </th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((t) => (
            <tr
              key={t.id}
              className="border-t border-gray-300 hover:bg-slate-50 cursor-pointer"
              onClick={() => onSelect(t)}
            >
              <td className="p-2">{t.name}</td>
              <td className="p-2">{t.subject}</td>
              <td className="p-2">{t.section}</td>
            </tr>
          ))}

          {paginated.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-slate-500">
                No teachers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-3 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
