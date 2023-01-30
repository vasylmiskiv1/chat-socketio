/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#e0fffd",
        "chat" : "#ccfad7",
        "chat-messages-field" : "#d6e0dd",
        "chat-right-sidebar" : "rgba(0, 51, 102, 0.73)",
      },
    },
  },
  plugins: [],
};
