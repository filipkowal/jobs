const customBoard = require("./customBoard.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: customBoard.colors,
      screens: {
        "2xl": "1536px",
        "3xl": "1920px",
      },
    },
    fontFamily: {
      sans: ["var(--font-inter)", "sans-serif"],
      title: ["var(--font-stolzl)", "sans-serif"],
      serif: ["var(--font-merriweather)", "serif"],
      logo: ["var(--font-loew)", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-animate"),
  ],
};
