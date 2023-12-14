import reactAria from "tailwindcss-react-aria-components";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [reactAria({ prefix: "rac" })],
};
