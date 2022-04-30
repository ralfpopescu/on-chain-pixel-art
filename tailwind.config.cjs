module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'main': ['"Inconsolata"', 'monospace']
      },
      colors: {
        dark: '#0f0b24',
        dark2: '#1f1a36',
        light: '#757083',
        secondary: '#474056',
        tertiary: '#474056',
        emphasis: '#B9C6AE',
        silver: '#C4CBCA',
        pink: '#EE4266',
        violet: '#2A1E5C',
        teal: '#3CBBB1',
      },
    },
  },
  plugins: [],
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
};