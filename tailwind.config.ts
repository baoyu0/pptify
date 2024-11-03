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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            h1: {
              marginBottom: "0.5em",
            },
            pre: {
              backgroundColor: "#1e293b",
              color: "#e2e8f0",
              padding: "1em",
              borderRadius: "0.5em",
              marginTop: "1em",
              marginBottom: "1em",
            },
            code: {
              color: "#e2e8f0",
              backgroundColor: "#1e293b",
              paddingLeft: "0.25em",
              paddingRight: "0.25em",
              paddingTop: "0.125em",
              paddingBottom: "0.125em",
              borderRadius: "0.25em",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
