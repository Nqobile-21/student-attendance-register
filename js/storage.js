// =======================================
// STORAGE FUNCTIONS
// =======================================

const STORAGE_KEY = "students";

// Load Students
function loadStudents() {

    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

}

// Save Students
function saveStudents(students) {

    // Sort alphabetically before saving
    students.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );

}

// Remove All Students
function clearStudents() {

    localStorage.removeItem(STORAGE_KEY);

}

// Reset Attendance
function resetAttendance(students) {

    students.forEach(student => {

        student.status = "Absent";

    });

    saveStudents(students);

}

// Export CSV
function exportCSV(students) {

    let csv = "Student ID,Student Name,Status\n";

    students.forEach(student => {

        csv += `${student.id},${student.name},${student.status}\n`;

    });

    const blob = new Blob([csv], {

        type: "text/csv"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "attendance.csv";

    a.click();

    URL.revokeObjectURL(url);

}