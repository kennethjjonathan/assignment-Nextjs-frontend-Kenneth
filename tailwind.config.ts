import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        "generic-top-mobile": "6rem",
        "generic-horizontal-mobile": "0.75rem",
      },
      colors: {
        primary: "#f8f4ec",
        "text-primary": "#252222",
        "text-secondary": "#6b7280",
        "red-custom": "#ff002a",
        "dark-custom": "#252222",
        "smokewhite-custom": "#F5F5F5",
        "blue-custom": "#17adff",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
