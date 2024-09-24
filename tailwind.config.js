/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF', //white
        // secondary: '#00754A', // Green
        secondary: '#503225', 
        accent : '',
        'primary-foreground': '#F5F5DC', // Off-White
        'muted-foreground': '#D3D3D3', // Light Gray
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
        card : '#503225',
        'card-title': '#F5F5DC',
      },
      fontFamily: {
       spartan: ['"League Spartan"', 'sans-serif'], // Add your font here
       quicksand: ['"Quicksand"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

