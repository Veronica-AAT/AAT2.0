import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f0fa",
          100: "#b3d4f0",
          200: "#80b8e6",
          300: "#4d9cdc",
          400: "#2688d5",
          500: "#0068B5",
          600: "#005494",
          700: "#004073",
          800: "#002c52",
          900: "#001831",
        },
        accent: "#0086E0",
        dark: "#0a1628",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [typography],
};

export default config;
