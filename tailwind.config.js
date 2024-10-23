/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            '2md': '832px',
            '3md': '896px',
            '4md': '960px',
            '5md': '1000px',
            '6md': '1012px',
            lg: '1024px',
            '2lg': '1088px',
            '3lg': '1152px',
            '4lg': '1226px',
            xl: '1280px',
            '2xl': '1536px',
            '3xl': '1600px'
        }
    },
    plugins: [require('@tailwindcss/typography')]
}
