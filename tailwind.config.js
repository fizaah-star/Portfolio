export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 30px rgba(0, 229, 255, 0.18)',
      },
      colors: {
        night: '#070B16',
        panel: '#101A2D',
        bgSecondary: '#0B1220',
        cyan: '#00E5FF',
        violet: '#8B5CF6',
        blue: '#3B82F6',
        text: '#F8FAFC',
        muted: '#94A3B8',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(139,92,246,0.18), transparent 30%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseSlow: 'pulseSlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
