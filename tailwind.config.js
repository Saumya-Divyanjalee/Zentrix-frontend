/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Roboto Mono"', 'monospace'],
        bungee: ['"Bungee"', 'sans-serif'],
      },
      colors: {
        primary: { 50:'#f0f4ff',100:'#e0e9ff',200:'#c7d7fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81' },
        gold: { 100:'#fef9e7',200:'#fdeaa8',300:'#fbd95b',400:'#f9c826',500:'#d4a017' },
        luxury: { 50:'#fafafa',100:'#f4f4f5',200:'#e4e4e7',300:'#d4d4d8',400:'#a1a1aa',500:'#71717a',600:'#52525b',700:'#3f3f46',800:'#27272a',900:'#18181b' }
      },
      boxShadow: {
        'luxury': '0 4px 24px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'luxury-lg': '0 8px 40px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        'luxury-xl': '0 20px 60px rgba(99,102,241,0.15), 0 4px 16px rgba(0,0,0,0.08)',
        'gold': '0 4px 20px rgba(212,160,23,0.2)',
      }
    }
  },
  plugins: []
}
