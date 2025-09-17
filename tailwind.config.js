/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(200, 80%, 50%)',
        accent: 'hsl(40, 90%, 55%)',
        bg: 'hsl(210, 15%, 95%)',
        surface: 'hsl(210, 15%, 100%)',
        'text-primary': 'hsl(210, 15%, 20%)',
        'text-secondary': 'hsl(210, 15%, 40%)',
        border: 'hsl(210, 15%, 85%)',
        success: 'hsl(140, 50%, 50%)',
        warning: 'hsl(40, 80%, 50%)',
        danger: 'hsl(0, 70%, 50%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 15%, 0%, 0.08)',
        'focus': '0 0 0 3px hsla(200, 80%, 50%, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
