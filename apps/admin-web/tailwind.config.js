/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral palette — same slate scale the mobile app's tokens resolve
        // to (ink-100 === surfaceMuted, ink-200 === border, ink-300 ===
        // borderInput), so admin-web and mobile stay in lockstep for free.
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Brand primary — MatchUp blue (#0B1F8A in apps/mobile/.../app_colors.dart)
        brand: {
          50: '#eef2ff',
          100: '#dbeafe',
          200: '#b9cffb',
          300: '#8fadf6',
          400: '#4f72e0',
          500: '#1e39b8',
          600: '#0b1f8a',
          700: '#081560',
          800: '#060f45',
        },
        // Accent — MatchUp orange (#FF6B00), used sparingly for CTAs/highlights
        accent: {
          50: '#fff4ec',
          100: '#ffe5d0',
          200: '#ffc79b',
          400: '#ff8a33',
          500: '#ff6b00',
          600: '#e05f00',
          700: '#b84c00',
        },
        // Semantic states — reusing the exact, contrast-audited values from
        // the mobile design system (statusSuccessText, warningStrong, errorStrong)
        success: { 50: '#e1f9f1', 500: '#22c55e', 600: '#04694a' },
        warning: { 50: '#fffbeb', 500: '#f59e0b', 600: '#b45309' },
        danger: { 50: '#fee2e2', 500: '#ef4444', 600: '#b91c1c' },
      },
      spacing: {
        sidebar: '17rem',
        topbar: '4rem',
      },
      borderRadius: {
        input: '12px',
        card: '16px',
      },
      boxShadow: {
        // Two-layer "modern minimal" shadow — matches AppShadows.card on mobile.
        card: '0 1px 3px 0 rgba(15,23,42,0.06), 0 4px 12px -2px rgba(15,23,42,0.10)',
        floating: '0 8px 24px -4px rgba(15,23,42,0.14)',
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
