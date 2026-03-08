const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const root = document.documentElement;
        const currentTheme = root.getAttribute("data-bs-theme") || "dark";
        
        if (currentTheme === "dark") {
            root.setAttribute("data-bs-theme", "light");
        } else {
            root.setAttribute("data-bs-theme", "dark");
        }

    });
}