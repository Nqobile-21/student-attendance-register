// ======================================
// Student Attendance Register
// ======================================

// ---------- DOM Elements ----------
const studentForm = document.getElementById("studentForm");
const studentIdInput = document.getElementById("studentId");
const studentNameInput = document.getElementById("studentName");
const studentTable = document.getElementById("studentTable");
const currentDate = document.getElementById("currentDate");

const totalStudents = document.getElementById("totalStudents");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");
const attendanceRate = document.getElementById("attendanceRate");

const searchInput = document.getElementById("searchInput");
const filterStatus = document.getElementById("filterStatus");

const submitButton = document.querySelector(".btn");

// ---------- Local Storage ----------
let students = JSON.parse(localStorage.getItem("students")) || [];

// Used to know whether we're editing
let editingStudentId = null;

// ---------- Current Date ----------
const today = new Date();

currentDate.textContent = today.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

// ---------- Save ----------
function saveStudents() {

    students.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    localStorage.setItem("students", JSON.stringify(students));

}

// ---------- Render Students ----------
function renderStudents() {

    students.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    studentTable.innerHTML = "";


    const search = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(student => {

        const matchesSearch =
            student.name.toLowerCase().includes(search) ||
            student.id.toLowerCase().includes(search);

        const matchesFilter =
            filterStatus.value === "all" ||
            student.status === filterStatus.value;

        return matchesSearch && matchesFilter;

    });

    if (filteredStudents.length === 0) {

        studentTable.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No students found.
                </td>
            </tr>
        `;

        updateSummary();
        return;
    }

    filteredStudents.forEach(student => {

        studentTable.innerHTML += `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>
                    <span class="${student.status === "Present" ? "present" : "absent"}">
                        ${student.status}
                    </span>
                </td>

                <td>

                    <button class="action-btn toggle"
                        onclick="toggleAttendance('${student.id}')">
                        Toggle
                    </button>

                    <button class="action-btn edit"
                        onclick="editStudent('${student.id}')">
                        Edit
                    </button>

                    <button class="action-btn delete"
                        onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

    updateSummary();
}

// ---------- Add / Update ----------
studentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const id = studentIdInput.value.trim();
    const name = studentNameInput.value.trim();

    if (!id || !name) {
        alert("Please fill in all fields.");
        return;
    }

    // ==========================
    // UPDATE
    // ==========================
    if (editingStudentId !== null) {

        // Prevent duplicate IDs
        const duplicate = students.find(student =>
            student.id === id &&
            student.id !== editingStudentId
        );

        if (duplicate) {
            alert("Student ID already exists.");
            return;
        }

        students = students.map(student => {

            if (student.id === editingStudentId) {

                return {
                    ...student,
                    id,
                    name
                };

            }

            return student;

        });

        editingStudentId = null;

        submitButton.textContent = "Add Student";

    }

    // ==========================
    // ADD NEW
    // ==========================
    else {

        if (students.some(student => student.id === id)) {

            alert("Student ID already exists.", "error");

            return;

        }

        students.push({

            id,
            name,
            status: "Absent"

        });

    }

    saveStudents();

renderStudents();

studentForm.reset();

showToast("Student added successfully!", "success");

});

// ---------- Edit ----------
function editStudent(id) {

    const student = students.find(student => student.id === id);

    if (!student) return;

    studentIdInput.value = student.id;
    studentNameInput.value = student.name;

    editingStudentId = id;

    submitButton.textContent = "Update Student";

    studentIdInput.focus();

}

// ---------- Delete ----------
function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    students = students.filter(student => student.id !== id);

    saveStudents();
    renderStudents();
    showToast("Student deleted successfully!", "info");  

 

}

// ---------- Toggle Attendance ----------
function toggleAttendance(id) {

    students = students.map(student => {

        if (student.id === id) {

            student.status =
                student.status === "Present"
                    ? "Absent"
                    : "Present";

        }

        return student;

    });

    saveStudents();

    renderStudents();
    showToast("Attendance status updated sucessfully!");

}

// ---------- Summary ----------
function updateSummary() {

    const total = students.length;

    const present = students.filter(student =>
        student.status === "Present"
    ).length;

    const absent = total - present;

    totalStudents.textContent = total;

    presentCount.textContent = present;

    absentCount.textContent = absent;

    attendanceRate.textContent =
        total === 0
            ? "0%"
            : ((present / total) * 100).toFixed(1) + "%";

}

// ---------- Search ----------
searchInput.addEventListener("input", renderStudents);

// ---------- Filter ----------
filterStatus.addEventListener("change", renderStudents);

// ---------- Initial Load ----------
loadTheme();
renderStudents();