module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: { poppin: ["Poppins", "sans-serif"] },
    extend: {
      colors: { "Perf-grey": "#d1d1d1", "star-grey": "#c1c1c5" },
      padding: { star: "5px 6px ", savePlace: "5px 85px" },
    },
  },
  plugins: [],
};
