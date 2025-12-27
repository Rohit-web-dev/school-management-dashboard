"use client";
import React, { useState, useEffect, useRef } from "react";
import DataTable from "./components/DataTable";
import TeacherTable from "./components/TeacherTable";

export default function SchoolDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [view, setView] = useState("students"); // students | teachers | settings
  const printRef = useRef();

  // Sample data (replace with API calls)
  const [students] = useState([
    { id: 1, name: "Asha Singh", class: "8-A", roll: 12, avatar: null, marks: { Math: 88, English: 76, Science: 91, Social: 82 } },
    { id: 2, name: "Rahul Kumar", class: "5-B", roll: 7, avatar: null, marks: { Math: 65, English: 72, Science: 70, Social: 68 } },
    { id: 3, name: "Meera Patel", class: "9-C", roll: 1, avatar: null, marks: { Math: 95, English: 89, Science: 92, Social: 90 } },
    { id: 4, name: "Varun Sharma", class: "7-B", roll: 15, avatar: null, marks: { Math: 78, English: 81, Science: 74, Social: 80 } },
    { id: 5, name: "Priya Verma", class: "6-A", roll: 5, avatar: null, marks: { Math: 84, English: 79, Science: 88, Social: 85 } },
    { id: 6, name: "Arjun Yadav", class: "8-C", roll: 9, avatar: null, marks: { Math: 92, English: 86, Science: 90, Social: 87 } },
    { id: 7, name: "Neha Gupta", class: "10-A", roll: 2, avatar: null, marks: { Math: 71, English: 75, Science: 69, Social: 73 } },
    { id: 8, name: "Rohan Das", class: "9-B", roll: 18, avatar: null, marks: { Math: 88, English: 82, Science: 85, Social: 80 } },
    { id: 9, name: "Sneha Roy", class: "7-A", roll: 11, avatar: null, marks: { Math: 94, English: 90, Science: 92, Social: 89 } },
    { id: 10, name: "Amit Singh", class: "6-C", roll: 3, avatar: null, marks: { Math: 76, English: 68, Science: 72, Social: 70 } },
    { id: 11, name: "Divya Sharma", class: "8-B", roll: 6, avatar: null, marks: { Math: 89, English: 84, Science: 87, Social: 83 } },
    { id: 12, name: "Arjun Kumar", class: "8-C", roll: 21, avatar: null, marks: { Math: 67, English: 70, Science: 65, Social: 69 } }
  ]);

  const [teachers] = useState([
    { id: 1, name: "Amit Sharma", subject: "Mathematics", phone: "9876543210", address: "Green Valley, Ranchi", qualification: "M.Sc Mathematics, B.Ed", experience: "7 Years", section: "8th, 9th, 10th", image: "https://cdn.pixabay.com/photo/2022/04/15/15/34/gesture-7134756_1280.jpg" },
    { id: 2, name: "Priya Verma", subject: "English", phone: "9865321470", address: "Harmu Colony, Ranchi", qualification: "MA English, B.Ed", experience: "5 Years", section: "6th, 7th", image: "https://cdn.pixabay.com/photo/2024/05/23/20/18/ai-generated-8783789_1280.jpg" },
    { id: 3, name: "Sanjay Kumar", subject: "Science", phone: "9123456789", address: "Bariatu Road, Ranchi", qualification: "B.Sc Physics, B.Ed", experience: "8 Years", section: "8th to 10th", image: "https://cdn.pixabay.com/photo/2022/04/15/15/34/gesture-7134756_1280.jpg" },
    { id: 4, name: "Neha Singh", subject: "Social Science", phone: "9890123456", address: "Doranda, Ranchi", qualification: "MA History, B.Ed", experience: "6 Years", section: "6th, 7th, 8th", image: "https://cdn.pixabay.com/photo/2024/05/23/20/18/ai-generated-8783789_1280.jpg" },
    { id: 5, name: "Rohit Verma", subject: "Computer Science", phone: "9912345678", address: "Kanke Road, Ranchi", qualification: "BCA, MCA", experience: "4 Years", section: "9th, 10th", image: "https://cdn.pixabay.com/photo/2022/04/15/15/34/gesture-7134756_1280.jpg" },
    { id: 6, name: "Anjali Sahu", subject: "Hindi", phone: "9823456710", address: "Morabadi, Ranchi", qualification: "MA Hindi, B.Ed", experience: "5 Years", section: "6th to 10th", image: "https://cdn.pixabay.com/photo/2024/05/23/20/18/ai-generated-8783789_1280.jpg" },
    { id: 7, name: "Rajesh Gupta", subject: "Physics", phone: "9934567812", address: "Lalpur, Ranchi", qualification: "M.Sc Physics, B.Ed", experience: "10 Years", section: "9th, 10th", image: "https://cdn.pixabay.com/photo/2022/04/15/15/34/gesture-7134756_1280.jpg" },
    { id: 8, name: "Kavita Mishra", subject: "Biology", phone: "9876012345", address: "Kokar, Ranchi", qualification: "M.Sc Biology, B.Ed", experience: "7 Years", section: "8th, 9th, 10th", image: "https://cdn.pixabay.com/photo/2024/05/23/20/18/ai-generated-8783789_1280.jpg" },
    { id: 9, name: "Aditya Raj", subject: "Chemistry", phone: "9812345609", address: "Ratu Road, Ranchi", qualification: "M.Sc Chemistry, B.Ed", experience: "9 Years", section: "9th, 10th", image: "https://cdn.pixabay.com/photo/2022/04/15/15/34/gesture-7134756_1280.jpg" },
    { id: 10, name: "Suman Pandey", subject: "Geography", phone: "9901234567", address: "Ashok Nagar, Ranchi", qualification: "MA Geography, B.Ed", experience: "6 Years", section: "6th, 7th, 8th", image: "https://cdn.pixabay.com/photo/2024/05/23/20/18/ai-generated-8783789_1280.jpg" }
  ]);

  // Calculate total, percentage & grade
  function calculateResult(marks) {
    const fullMarkPerSubject = 100;
    const subjects = Object.values(marks);
    const obtained = subjects.reduce((a, b) => a + b, 0);
    const fullMarks = subjects.length * fullMarkPerSubject;

    const percentage = ((obtained / fullMarks) * 100).toFixed(2);

    let grade = "C";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else grade = "D";

    return { obtained, fullMarks, percentage, grade };
  }

  // Find Top 3 students
  function getRank(id) {
    // Sort by total marks
    const sorted = [...students]
      .map(s => ({ ...s, total: Object.values(s.marks).reduce((a, b) => a + b) }))
      .sort((a, b) => b.total - a.total);

    const index = sorted.findIndex(s => s.id === id);
    return index + 1; // Rank
  }

  const handlePrint = () => {
    const printContent = printRef.current;
    const WinPrint = window.open("", "", "width=900,height=900");
    WinPrint.document.write(`
    <html>
      <head>
        <title>Student Marksheet</title>
        <style>
          body { font-family: Arial, sans-serif; padding:20px; }
          table { width:100%; border-collapse: collapse; }
          th, td { border:1px solid #ccc; padding:8px; text-align:left; }
          .header { text-align:center; margin-bottom:20px; }
          .section { margin-bottom:15px; }
        </style>
      </head>
      <body>${printContent.innerHTML}</body>
    </html>
  `);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  // Close the student detail on small screens when view changes
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (view === "teachers") {
      setSelectedStudent(null);
    } else if (view === "students") {
      setSelectedTeacher(null);
    }
    // Keep sidebar behavior as before
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, [view]);

  function openMarksheet(student) {
    setSelectedStudent(student);
    // on small screens ensure sidebar closes
    if (window.innerWidth < 768) setSidebarOpen(false);
  }

  return (
    <div className="h-screen flex bg-slate-50 text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-300 transition-all ${sidebarOpen ? "w-72" : "w-16"} overflow-hidden`}>
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-300">
          <div className="flex-1">
            {sidebarOpen && <div className="font-semibold text-lg">Sunrise School</div>}
            {sidebarOpen && <div className="text-xs text-slate-500">Admin Dashboard</div>}
          </div>
          <button aria-label="toggle" className="p-2 rounded hover:bg-slate-100" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="p-3">
          <button onClick={() => setView("students")} className={`flex items-center gap-3 w-full p-2 rounded ${view === "students" ? "bg-sky-50 border-l-4 border-sky-500" : "hover:bg-slate-50"}`}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" /></svg>
            {sidebarOpen && <span>Students</span>}
          </button>

          <button onClick={() => setView("teachers")} className={`mt-2 flex items-center gap-3 w-full p-2 rounded ${view === "teachers" ? "bg-sky-50 border-l-4 border-sky-500" : "hover:bg-slate-50"}`}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7" /></svg>
            {sidebarOpen && <span>Teachers</span>}
          </button>

          <button onClick={() => setView("settings")} className={`mt-2 flex items-center gap-3 w-full p-2 rounded ${view === "settings" ? "bg-sky-50 border-l-4 border-sky-500" : "hover:bg-slate-50"}`}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v8" /></svg>
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>

      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button> */}
            <h2 className="text-lg font-semibold">{view === "students" ? "Students" : view === "teachers" ? "Teachers" : "Settings"}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded hover:bg-slate-50" title="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>

            <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-50">
              <img src="https://cdn.pixabay.com/photo/2025/08/26/11/57/ai-generated-9798057_1280.png" alt="user" className="h-9 w-9 rounded-full object-cover" />
              <div className="hidden md:block text-sm">
                <div className="font-medium">Admin</div>
                <div className="text-xs text-slate-500">admin@sunrise.edu</div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {/* Left column: Students / Teachers list */}
            <section className="md:col-span-2 bg-white p-4 rounded shadow-sm border border-gray-300">
              {view === "students" && (
                <div>
                  <h3 className="font-semibold mb-4">Student List</h3>
                  <DataTable data={students} onRowClick={openMarksheet} />
                </div>
              )}

              {view === "teachers" && (
                <div>
                  <h3 className="font-semibold mb-3">Teacher List</h3>
                  <TeacherTable
                    teachers={teachers}
                    onSelect={(t) => setSelectedTeacher(t)}
                  />
                </div>
              )}

              {view === "settings" && (
                <div>
                  <h3 className="font-semibold mb-3">Settings</h3>
                  <p className="text-sm text-slate-600">Configure school details, terms, sessions and other preferences.</p>
                </div>
              )}
            </section>

            {/* Right column: Marksheet / details */}
            <aside className="lg:col-span-1 md:col-span-2 bg-white p-4 rounded shadow-sm border border-gray-300">

              {/* ⭐ When teacher tab is open */}
              {view === "teachers" ? (
                selectedTeacher ? (
                  <div className="w-full bg-white p-2 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-40 blur-2xl"></div>
                    <h2 className="text-xl font-bold text-slate-700 border-b border-gray-400 pb-3 mb-6">
                      Teacher Information
                    </h2>
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={selectedTeacher.image || "https://cdn.pixabay.com/photo/2024/05/23/20/18/ai-generated-8783789_1280.jpg"}
                        alt="Teacher"
                        className="w-24 h-24 rounded-full object-cover border-4 border-sky-100 shadow-md"
                      />
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-800">
                          {selectedTeacher.name}
                        </h3>
                        <p className="text-cyan-600 font-medium">{selectedTeacher.subject}</p>
                        <p className="text-sm text-slate-500">📞 {selectedTeacher.phone}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                      <div className="p-3 bg-slate-50 rounded-sm border border-gray-300">
                        <p className="text-xs text-slate-500">Address</p>
                        <p className="font-medium text-slate-700">{selectedTeacher.address}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-sm border border-gray-300">
                        <p className="text-xs text-slate-500">Section</p>
                        <p className="font-medium text-slate-700">{selectedTeacher.section}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-sm border border-gray-300">
                        <p className="text-xs text-slate-500">Qualification</p>
                        <p className="font-medium text-slate-700">{selectedTeacher.qualification}</p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-sm border border-gray-300">
                        <p className="text-xs text-slate-500">Experience</p>
                        <p className="font-medium text-slate-700">{selectedTeacher.experience}</p>
                      </div>

                    </div>

                    <div className="mt-6 p-4 bg-sky-100 rounded-sm text-black shadow-inner">
                      <p className="text-center font-semibold text-sm">
                        Dedicated to shaping the future with passion and excellence ✨
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className="w-full bg-white">
                    <h2 className="text-lg font-semibold text-slate-700 border-b border-gray-300 pb-2 mb-3">
                      Teacher Details
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Select a teacher from the left panel to view details.
                    </p>
                  </div>
                )
              ) : null}

              {/* ⭐ When student tab is open */}
              {view === "students" && (
                !selectedStudent ? (
                  <div className="w-full bg-white">
                    <h2 className="text-lg font-semibold text-slate-700 border-b border-gray-300 pb-2 mb-3">
                      Student Marksheet.
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Select a student to view marksheet.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between no-print mb-3">
                      <h2 className="text-lg text-slate-700">Student Marksheet</h2>

                      <button
                        onClick={handlePrint}
                        className="bg-cyan-500 text-white px-4 py-1 rounded shadow cursor-pointer"
                      >
                        Print
                      </button>
                    </div>

                    {/* MARKSHEET */}
                    <div ref={printRef} className="space-y-5 print-card relative overflow-hidden">

                      {/* WATERMARK */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                        <span className="font-bold text-[30px] md:text-[20px] lg:text-[80px] text-gray-300 opacity-15 -rotate-45 whitespace-nowrap print:text-[160px] print:opacity-20 text-center">
                          SUNRISE <br /> SCHOOL
                        </span>
                      </div>


                      {(() => {
                        const result = calculateResult(selectedStudent.marks);
                        const rank = getRank(selectedStudent.id);

                        return (
                          <>
                            <div className="text-center border-b border-gray-400 pb-3">
                              <h2 className="text-xl font-bold">SUNRISE PUBLIC SCHOOL</h2>
                              <p className="text-sm text-slate-600">
                                Official Report Card / Marksheet
                              </p>

                              {rank <= 3 && (
                                <div className="mt-2 inline-block bg-yellow-300 text-black px-3 py-1 rounded-full text-xs font-semibold">
                                  🏆 Top {rank} Performer
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div><b>Name:</b> {selectedStudent.name}</div>
                              <div><b>Class:</b> {selectedStudent.class}</div>
                              <div><b>Roll No:</b> {String(selectedStudent.roll).padStart(3, "0")}</div>
                              <div><b>Rank:</b> {rank}</div>
                            </div>

                            <div className="border border-gray-300 rounded p-3">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-slate-100 text-left">
                                    <th className="p-2">Subject</th>
                                    <th className="p-2">Full Marks</th>
                                    <th className="p-2">Obtained</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {Object.entries(selectedStudent.marks).map(([sub, m]) => (
                                    <tr key={sub} className="border-t border-gray-300">
                                      <td className="p-2">{sub}</td>
                                      <td className="p-2">100</td>
                                      <td className="p-2">{m}</td>
                                    </tr>
                                  ))}

                                  <tr className="font-semibold bg-slate-50 border-t border-gray-400">
                                    <td className="p-2">Total</td>
                                    <td className="p-2">{result.fullMarks}</td>
                                    <td className="p-2">{result.obtained}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div><b>Percentage:</b> {result.percentage}%</div>
                              <div><b>Grade:</b> {result.grade}</div>
                              <div><b>Result:</b> {result.percentage < 33 ? "Fail" : "Pass"}</div>
                            </div>

                          </>
                        );
                      })()}

                    </div>
                  </>
                )
              )}

            </aside>

          </div>

        </main>

        <footer className="h-12 border-t border-gray-300 flex items-center justify-center text-xs text-slate-500">© Sunrise School — Professional Dashboard</footer>
      </div>
    </div>
  );
}

// ************************************************************************************
// BUILD BY ROHIT KUMAR PRAMANIK
// ************************************************************************************