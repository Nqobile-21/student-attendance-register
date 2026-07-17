// ===========================================
// UI FUNCTIONS
// ===========================================

// ---------- Toast Notification ----------
function showToast(message, type = "success") {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}

// ---------- Dark Mode ----------
function toggleTheme() {

    document.body.classList.toggle("dark");

    const theme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", theme);

    const button = document.getElementById("themeBtn");

    if (button) {

        button.innerHTML =
            theme === "dark"
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

    }

}

// ---------- Load Theme ----------
function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }

    const button = document.getElementById("themeBtn");

    if (button) {

        button.innerHTML =
            document.body.classList.contains("dark")
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

    }

}

// ---------- Empty State ----------
function showEmptyState(tableBody) {

    tableBody.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;padding:40px;">
                <h3>No Students Found</h3>
                <p>Add your first student to begin.</p>
            </td>
        </tr>
    `;

}