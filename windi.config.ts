export default {
  theme: {
    extend: {
      screens: {
        xxl: "1400px",
      },
      colors: {
        ui: {
          background: "var(--color-ui-background)",
          sidebar: "var(--color-ui-sidebar)",
          typo: "var(--color-ui-typo)",
          primary: "var(--color-ui-primary)",
          border: "var(--color-ui-border)",
        },
      },
      spacing: {
        sm: "24rem",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  scan: {
    dirs: ["./"],
    exclude: ["node_modules", ".git", "dist", ".cache", ".temp"],
  },
  preflight: {
    alias: {
      // add gridsome aliases
      "g-link": "a",
      "g-image": "img",
    },
  },
};
