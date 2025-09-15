/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'proximanova-thin' : ['ProximaNova-Thin'],
        'proximanova-light' : ['ProximaNova-Light'],
        'proximanova-regular' : ['ProximaNova-Regular'],
        'proximanova-medium' : ['ProximaNova-Medium'],
        'proximanova-semibold' : ['ProximaNova-Semibold'],
        'proximanova-bold' : ['ProximaNova-Bold'],
        'proximanova-black' : ['ProximaNova-Black'],
      },

      colors: {
        primary:"#111111",
        secondary: "#7A7A7A",
        placeholder: "#7D7D7D"
      }
    },
  },
  plugins: [],
};
