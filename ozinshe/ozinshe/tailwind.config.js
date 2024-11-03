/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'lg1': '#7E2DFC',
        'lg2': '#22BA5F',
        'Gray/G05' : 'rgba(143, 146, 161, 0.05)',
        'linear-gradient': 'linear-gradient(to right, #01DCBA, #7F30CB)',
      },
      width : {
        '84': "360px",
        '449': '449px',
        '535': '535px',
        '506':'506px',
        '800': '800px',
        '824': '824px',
        '1150': '1100px',
      },
      height : {
        '56': '56px',
        '66': '276px',
        '408': '408px',
        '460': '460px',
        '1373': '1373px',
      },
    },
  },
  plugins: [],
}
