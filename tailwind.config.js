/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                text: "var(--text)",
                "text-primary": "var(--text-primary)",
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
            },
            animation: {
                rotate: "spin 16s linear infinite",
            },
        },
    },
    plugins: [],
};
