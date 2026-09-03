/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        odyssey: {
          dark: '#0B0F19',      // Deep cinematic navy for contrast
          card: '#121826',      // Premium dark surface
          border: '#1E293B',    // Subtle divider lines
          accent: '#38BDF8',    // Vibrant sky blue primary CTA
          gold: '#F59E0B',      // Rating & highlight tone
          muted: '#94A3B8'      // Secondary readable text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}