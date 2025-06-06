const screens = {
  xxs: "320px", // iPhone SE / small phones
  xs: "375px", // iPhone 12 / 13 / mini
  sm: "414px", // iPhone 12 Pro Max, common breakpoint
  tablet: "640px", // iPad mini / portrait tablets
  laptop: "1024px", // standard laptops
  desktop: "1280px", // full HD desktops};
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // ✅ Ensure JIT mode is enabled
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/globals.css", // ✅ Explicitly include globals.css
  ],
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/*.{js,ts,jsx,tsx}",
    "./src/app/about/**/*.{js,ts,jsx,tsx}",
    "./src/app/post/**/*.{js,ts,jsx,tsx}",
    "./src/app/projects/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{ts,js,tsx,jsx}",
    "./src/app/globals.css", // ✅ Explicitly include globals.css
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
        "2/3": "2 / 3",
      },
      height: {
        11: "44px",
        36: "144px",
        45: "180px",
        49: "196px",
        58: "232px",
        59: "236px",
        87: "348px",
        117: "468px",
      },
      borderWidth: {
        1: "1px",
        0.5: "0.5px",
      },
      width: {
        51: "206px",
        58: "232px",
        87: "348px",
        90: "360px",
        96: "384px",
        118: "472px",
        120: "480px",
        163: "652px",
        ...screens,
        "3/4": "75vw",
      },
      minHeight: {
        648: "648px",
        "1/2": "50vh",
        "3/4": "75vh",
        "4/5": "80vh",
      },
      minWidth: {
        80: "320px",
        317: "1268px",
        ...screens,
        "1/2": "50vw",
        "2/5": "40vw",
        "3/5": "60vw",
        "3/4": "75vw",
        "4/5": "80vw",
      },
      maxWidth: {
        50: "200px",
        96: "384px",
        143: "572px",
        331: "1324px",
        ...screens,
      },
      padding: {
        "1/10": "10%",
        "1%": "1%",
        "2%": "2%",
        "3%": "3%",
        "4%": "4%",
        1.5: "6px",
        0.25: "2px",
      },
      borderRadius: {
        2: "2px",
        4: "4px",
        6: "6px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        ...screens,
      },
      boxShadow: {
        1: "0px 0px 1px 0px #0000000A,0px 0px 2px 0px #0000000F,0px 4px 8px 0px #0000000A;",
        2: "0px 0px 1px 0px #0000000A, 0px 2px 6px 0px #0000000A, 0px 16px 30px 0px #00000014;",
        boxTop:
          "0px -4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04)",
      },
      lineHeight: {
        11: "44px",
        "5xl": "48px",
        "6xl": "60px",
      },
      spacing: {
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
      },
      colors: {
        primary: {
          100: "#ECFDF5",
          200: "#D1FAE5",
          300: "#A7F3D0",
          400: "#6EE7B7",
          500: "#34D399",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#15522D",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        neutral: {
          50: "#EFF3FC",
          100: "#f6f9fc",
          200: "#eef1f4",
          300: "#dde3e8",
          400: "#c0c8d0",
          500: "#a5aeb7",
          600: "#8b949e",
          700: "#727c85",
          800: "#5a636d",
          900: "#444c54",
          1000: "#2d3034",
        },
        error: {
          0: "#fff7f7",
          20: "#ff4d4f",
          40: "#d64949",
          50: "#B23D3D",
          60: "#891a16",
        },
        warning: {
          0: "#FFFBF5",
          10: "#F8DCAB",
          40: "#cb8608",
          60: "#825700",
        },
        success: {
          0: "#008201",
        },
        info: {
          0: "#F5F8FF",
          10: "#ABC4F8",
          20: "#0845CB",
          30: "#002682",
        },
        disabled: {
          0: "#f5f5f5",
        },
        graph: {
          1: "#48BFB8",
          2: "#0845cb",
          3: "#F240A0",
          4: "#FF986D",
        },
        orange: {
          30: "#FF7E47",
          60: "#AA4317",
        },
        magenta: {
          40: "#EE178B",
          60: "#9F0F5D",
        },
        pending: {
          0: "#F5F8FF",
          10: "#ABC4F8",
          60: "#002682",
        },
        green: {
          600: "#2E862D",
        },
        red: {
          500: "#E82F2F",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
    fontFamily: {
      sans: ["Nunito Sans"],
      serif: ["GT Super"],
    },
  },
  darkMode: ["class", "class"],
  corePlugins: {
    preflight: true,
  },
  plugins: [import("tailwindcss-animate")],
};
