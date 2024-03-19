/** @type {import('tailwindcss').Config} */
export default {
  content: ["*"],
  theme: {
    extend: {
      colors: {
        "clr-primary": "#9E78CF",
        "clr-secondary": "#78CFB0",
        "b-primary": "#0D0714",
        "b-secondary": "#1D1825",
      },
      minHeight: {
        68: "17.5rem",
      },
      maxHeight: {
        75: "19rem",
      },
    },
  },
  plugins: [],
};
