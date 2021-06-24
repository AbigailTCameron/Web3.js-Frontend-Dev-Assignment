module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        black:{
          primary: '#161616',
          header: '#000000',
          bubble: '#101010',
          outline:'#575757',
          crypto: "#707070",
          dark: "#383838"
        },
        yellow:{
          primary: '#FEC004'
        },
        blue:{
          outline:'#2274A5',
        
        }
      },
      outline:{
        yellow:{
          primary: '#FEC004'
        },
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
