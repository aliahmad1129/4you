/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        taupe: '#9B8275',
        cocoa: '#80685D',
        cream: '#F1E3D9',
        beige: '#DCC9BD',
        'dino-orange': '#FF8A3D',
        'pale-yellow': '#FFE59A',
        'star-yellow': '#FFD95A',
        'cartoon-dark': '#29211F',
        'soft-peach': '#E9A66F',
      },
      fontFamily: {
        display: ['Fredoka', 'Baloo 2', 'cursive', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
        hand: ['Patrick Hand', 'Caveat', 'cursive'],
      },
      boxShadow: {
        'cartoon': '0 6px 0 0 #29211F',
        'cartoon-sm': '0 4px 0 0 #29211F',
        'cartoon-lg': '0 8px 0 0 #29211F',
        'cartoon-hover': '0 2px 0 0 #29211F',
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        'float-gentle': 'floatGentle 3s ease-in-out infinite',
        'bob': 'bob 2.5s ease-in-out infinite',
        'star-twinkle': 'twinkle 3s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(2deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.85) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.15) rotate(15deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
