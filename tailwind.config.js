/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    spacing: {
      0: "0px", px: "1px", 1: "8px", 2: "16px", 3: "24px", 4: "32px", 6: "48px", 8: "64px", 12: "96px",
      section: "var(--section-y)", touch: "44px",
    },
    fontSize: {
      xs: ["12px", "1.5"], sm: ["14px", "1.5"], base: ["16px", "1.65"], lg: ["20px", "1.4"],
      xl: ["24px", "1.3"], "2xl": ["32px", "1.2"], "3xl": ["48px", "1.1"],
    },
    borderRadius: { none: "0", sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)", full: "var(--radius-full)" },
    boxShadow: { none: "none", sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)" },
    extend: {
      colors: {
        bg: "var(--bg)", surface: "var(--surface)", surface2: "var(--surface-2)", glass: "var(--surface-glass)",
        line: "var(--border)", fg: "var(--text)", muted: "var(--text-muted)",
        accent: "var(--accent)", accentHover: "var(--accent-hover)", onAccent: "var(--on-accent)",
        success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)",
      },
      fontFamily: { heading: ["var(--font-heading)"], body: ["var(--font-body)"] },
      maxWidth: { container: "var(--container)", prose72: "72ch" },
      transitionDuration: { fast: "150ms", base: "200ms", slow: "250ms" },
    },
  },
  plugins: [],
};