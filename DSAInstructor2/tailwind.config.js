module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1.5s infinite'
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-5px)', opacity: '0.7' }
        }
      }
    },
  },
  plugins: [],
}