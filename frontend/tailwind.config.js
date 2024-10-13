/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: '#633CFF',
        'purple-light': '#f3f0fe',
        youtube: '#EE3939',
        twitter: '#43B7E9',
        linkedin: '#2D68FF',
        facebook: '#2442AC',
        twitch: '#EE3FC8',
        devto: '#333333',
        gitlab: '#EB4925',
        hashnode: '#0330D1'
      }
    }
  },
  plugins: []
};
