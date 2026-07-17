// =======================================
// VALIDATION FUNCTIONS
// =======================================

// Validate Student Number
function validateStudentId(studentId) {

    const pattern = /^PT\.(2022|2023|2024|2025|2026)\.[A-Z0-9]{6}$/;

    return pattern.test(studentId);

}

// Validate Student Name
function validateStudentName(studentName) {

    const pattern = /^[A-Za-z ]{2,50}$/;

    return pattern.test(studentName.trim());

}

// Check if Student ID already exists
function studentExists(studentId, students, editingStudentId = null) {

    return students.some(student => {

        if (editingStudentId) {

            return student.id === studentId &&
                   student.id !== editingStudentId;

        }

        return student.id === studentId;

    });

}

// Validate Form
function validateForm(studentId, studentName, students, editingStudentId = null) {

    if (studentId.trim() === "") {

        return {
            valid: false,
            message: "Student ID is required."
        };

    }

    if (studentName.trim() === "") {

        return {
            valid: false,
            message: "Student name is required."
        };

    }

    if (!validateStudentId(studentId)) {

        return {
            valid: false,
            message: "Student ID must follow the format PT.2025.ABC123"
        };

    }

    if (!validateStudentName(studentName)) {

        return {
            valid: false,
            message: "Student name may only contain letters and spaces."
        };

    }

    if (studentExists(studentId, students, editingStudentId)) {

        return {
            valid: false,
            message: "Student ID already exists."
        };

    }

    return {
        valid: true,
        message: ""
    };

}