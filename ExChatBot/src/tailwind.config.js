module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        primary: '#ff4d94',
        'primary-light': '#ff85b3',
        secondary: '#c77dff',
        accent: '#ff6b6b',
        dark: '#1a1a2e',
        darker: '#0d0d1a',
        light: '#f8f9fa',
        'user-bubble': '#4d79ff',
        'bot-bubble': '#ff66a3',
      },
      animation: {
        float: 'float 15s infinite linear',
        pulse: 'pulse 1.5s infinite',
        typing: 'typing 1.2s infinite',
        messageAppear: 'messageAppear 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '30%': { transform: 'translateY(-5px)', opacity: '1' },
        },
        messageAppear: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}