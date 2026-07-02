module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        luxury: {
          gold: '#D4AF37',       
          goldHover: '#AA882C',
          orange: '#FF5A1F',     
          cream: '#FDFBF7',      
          beige: '#F5EFEB',      
          charcoal: '#0B0B0C',   
          softBlack: '#141416',  
          darkGray: '#1C1C1E',
          warmWhite: '#F5F5F7'
        }
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
        'premium-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'ios-shadow': '0 20px 40px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        'ios': '20px',
      }
    },
  },
  plugins: [],
}