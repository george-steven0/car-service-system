/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const important = true;
export const darkMode = 'class';
export const theme = {
  screens: {
    'xsm': '450px',
    // => @media (min-width: 450px) { ... }
    'sm': '640px',
    // => @media (min-width: 640px) { ... }
    'md': '768px',
    // => @media (min-width: 768px) { ... }
    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }
    'mlg': '1150px',
    // => @media (min-width: 1150px) { ... }
    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }
    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  },
  extend: {
    colors: {
      primary: "#007bff",
      secondary: "#6c757d",
      success: '#28a745',
      danger: "#dc3545",
      warning: "#ffc107",
      info: "#17a2b8",
      light: "#f8f9fa",
      dark: "#343a40",
      mainBlue: '#3399FF',
      mainLightBlue: '#F3F6F9',
      mainDark: '#333',
      mainLightDark: '#555',
    },
  },
};
export const plugins = [];