/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "-2px": "10px",
        "-3px": "-5px",
        "-4px": "-5px",
        "-5px": "-5px",
        "-6px": "-5px",
        "-7px": "-5px",
      },
    },
  },
  plugins: [],
};
