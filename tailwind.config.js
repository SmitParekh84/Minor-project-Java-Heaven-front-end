/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: '#FFFFFF', // White
        secondary: '#503225', // Brown
        'primary-foreground': '#F5F5DC', // Off-White
        'muted-foreground': '#D3D3D3', // Light Gray
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
        card: '#503225',
        'card-title': '#F5F5DC',

        // Dark mode colors
        'dark-primary': '#1E1E1E', // Dark primary background (almost black)
        'dark-secondary': '#322621', // Dark secondary (darker brown)
        'dark-accent': '#4C2A19', // Accent color in dark mode (darker than brown)
        'dark-primary-foreground': '#C7C7A1', // Lighter Off-White for dark mode text
        'dark-muted-foreground': '#A9A9A9', // Darker muted color for text in dark mode
        'dark-success': '#16A34A',
        'dark-warning': '#D97706',
        'dark-danger': '#DC2626',
        'dark-info': '#2563EB',
        'dark-card': '#2D1F16', // Card background in dark mode
        'dark-card-title': '#EAE3D1', // Card title color in dark mode
      },
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'], // Custom font
        quicksand: ['"Quicksand"', 'sans-serif'],
      },
      zIndex: {
        '100': '100', // Adding z-100
        '200': '200', // Adding z-200 if needed
      },
    },
  },
  plugins: [],
}
