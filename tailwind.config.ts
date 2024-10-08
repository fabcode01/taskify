import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {


      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },


      colors:{
        azul: {
          claro: '#E3F5FD',
          escuro: '#021E2B',
          medio: '#19485F',
          clarinho: '#709CB1'
        },
        branco: {
          claro: '#F8F8F8',
          cinzinha: '#EAEAEA',
          
        },
        over: {
          claro: '#0000007c',
          
        },
  
      }

    },
    
    
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
