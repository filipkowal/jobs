const customBoard = require("./customBoard.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "digitalent-green": {
          DEFAULT: customBoard.colors.digitalentGreen.DEFAULT || "#66B573",
          light: customBoard.colors.digitalentGreen.light || "#D7E4DD",
        },
        "digitalent-gray": {
          light: customBoard.colors.digitalentGray.light || "#F2F2F2",
          dark: customBoard.colors.digitalentGray.dark || "#131313",
        },
        "digitalent-yellow": {
          DEFAULT: customBoard.colors.digitalentYellow.DEFAULT || "#E7E248",
        },
        "digitalent-blue": {
          DEFAULT: customBoard.colors.digitalentBlue.DEFAULT || "#193B44",
        },
        "digitalent-mine": {
          DEFAULT: customBoard.colors.digitalentMine.DEFAULT || "#363636",
        },
      },
      screens: {
        "2xl": "1536px",
        "3xl": "1920px",
      },
      height: {
        initial: "initial",
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
