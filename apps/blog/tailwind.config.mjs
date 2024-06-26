import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      animation: {
        gradient: "animatedgradient 6s ease infinite alternate",
      },
      fontFamily: {
        serif: ["Inter", ...defaultTheme.fontFamily.serif],
        display: ["Inter", ...defaultTheme.fontFamily.serif],
        lithops: ["Lithops", "Young Serif", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    darkTheme: "retro",
    themes: [
      {
        retro: {
        ...require("daisyui/src/theming/themes")["retro"],
        primary: "red",
      },
    }
    ],
  },
};
