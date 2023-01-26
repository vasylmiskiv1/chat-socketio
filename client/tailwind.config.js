/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "input-color": "rgba(171, 211, 208, 0.54)",
        "chat-background":
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,52,61,1) 0%, rgba(0,212,255,1) 100%)",
      },
    },
  },
  plugins: [],
};
