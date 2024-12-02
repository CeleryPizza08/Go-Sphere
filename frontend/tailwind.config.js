/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#2679F5',
        blueblack: '#00001e',
        bgblue: '#6699cc',
        glassblue: '#C9D9E8',
        highblack: '#181818',
        lowblack: '#383838',
        infoblack: '#6c6c6c',
        boxlightblue: '#F7FAFC',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        merri: ['Merriweather', 'serif'],
        trip: ['BlinkMacSystemFont', 'sans-serif'],
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
};
