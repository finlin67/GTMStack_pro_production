import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Design System: Colors - Premium GTMStack Palette (main.png)
      colors: {
        // Site-wide: deep navy to almost-black backgrounds
        'navy-deep': '#0A0F2D',
        'navy-dark': '#020617',
        // Semantic background tokens
        'bg0': '#020617',
        'bg1': '#0A0F2D',
        // Primary accent: electric cyan to blue
        'accent-cyan': '#00CFFF',
        'accent-blue': '#3B82F6',
        // Gradient text: pink-purple to blue
        'gradient-pink': '#C026D3',
        // Positive metrics / growth
        'success-green': '#22C55E',
        // Secondary text (light cyan)
        'text-cyan': '#67E8F9',
        'text-cyan-soft': '#67E8F9',
        // Primary ramp: deep navy → cobalt → electric blue
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a4bafc',
          400: '#7b93f8',
          500: '#5a6cf2', // Electric blue
          600: '#4149e6', // Cobalt
          700: '#353acb',
          800: '#1e2a5c', // Deep navy
          900: '#0f172a', // Darkest navy
          950: '#020617',
        },
        // Cool accent: violet/cyan for SaaS energy
        cool: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa', // Violet
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Warm spark: subtle orange/gold for highlights
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Red as rare signal accent only
        signal: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        // Neutral slate for text and backgrounds
        slate: {
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
          950: '#020617',
        },
        // Success/data visualization
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        // Automation Engine Dashboard custom colors
        'dark-bg': '#0a0a0f',
        'card-bg': '#1a1a24',
        'content-text': '#f5f5f5',
        'content-text-muted': '#a0a0a0',
        'navy-blue': '#1e3a5f',
        'vibrant-blue': '#2563eb',
        'teal': '#10b981',
        'salmon-pink': '#f43f5e',
        // ABM Network Dashboard custom colors (prefixed to avoid conflicts)
        'anim-primary': '#60A5FA',        // Light blue for primary actions
        'anim-secondary': '#A78BFA',      // Purple/violet for secondary elements
        'anim-accent': '#FBbf24',         // Gold/yellow for accents
        'background-dark': '#0f1420',     // Dark navy background
        // Alias for animation components using 'primary', 'secondary' directly
        'primary': {
          DEFAULT: '#60A5FA',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        'secondary': {
          DEFAULT: '#A78BFA',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      // Design System: Typography Scale
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-cabinet)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid type scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      // Design System: Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Design System: Border Radius
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'medium': '0.75rem',
        'lg': '0.75rem',
        'large': '1rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      // Design System: Box Shadows
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 8px 24px -4px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 16px 48px -8px rgba(0, 0, 0, 0.16)',
        'glow': '0 0 40px -8px rgba(90, 108, 242, 0.4)',
        'glow-accent': '0 0 40px -8px rgba(249, 115, 22, 0.4)',
        'glow-violet': '0 0 40px -8px rgba(139, 92, 246, 0.4)',
        'glow-cyan': '0 0 40px -8px rgba(34, 211, 238, 0.3)',
        'glow-electric': '0 0 40px -4px rgba(0, 207, 255, 0.5), 0 0 80px -8px rgba(59, 130, 246, 0.25)',
        'glow-cyan-soft': '0 0 60px -15px rgba(0, 207, 255, 0.25)',
        'glow-cyan-hover': '0 0 35px rgba(0, 207, 255, 0.25)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'dark-soft': '0 2px 8px -2px rgba(0, 0, 0, 0.3), 0 4px 16px -4px rgba(0, 0, 0, 0.4)',
        'dark-medium': '0 4px 12px -2px rgba(0, 0, 0, 0.4), 0 8px 24px -4px rgba(0, 0, 0, 0.5)',
      },
      // Design System: Animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-left': 'slideLeft 0.4s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'drift-slow': 'drift 20s ease-in-out infinite',
        'drift-medium': 'drift 15s ease-in-out infinite',
        'drift-fast': 'drift 10s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      // Design System: Background patterns & gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #C026D3 0%, #3B82F6 100%)',
        'gradient-bg-vertical': 'linear-gradient(180deg, #0A0F2D 0%, #020617 50%, #0A0F2D 100%)',
        'gradient-bg-hero': 'linear-gradient(135deg, #0A0F2D 0%, #0d1338 25%, #020617 55%, #0A0F2D 100%)',
        'grid-pattern': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        'dot-pattern': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3e%3ccircle fill='rgb(148 163 184 / 0.1)' cx='10' cy='10' r='1.5'/%3e%3c/svg%3e")`,
      },
      // Border color for cyan glow surfaces
      borderColor: {
        'cyan-glow': 'rgba(0, 207, 255, 0.18)',
        'cyan-glow-strong': 'rgba(0, 207, 255, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

