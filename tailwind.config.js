export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0c1220",
        accent: "#8b5cf6",
        glow: "#22d3ee",
      },
      boxShadow: {
        glow: "0 0 45px rgba(34, 211, 238, 0.18)",
      },
    },
  },
  plugins: [],
};
