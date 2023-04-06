/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      custom: ["LemonMilk", "Permanent Marker"],
    },
    extend: {
      maxHeight: {
        "calc-full-minus-x": "calc(100% - 40px)",
      },
    },
  },
};
