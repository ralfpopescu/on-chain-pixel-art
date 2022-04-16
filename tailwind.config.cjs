module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'main': ['"Inconsolata"', 'monospace']
      },
      colors: {
        dark: '#090C08',
        light: '#757083',
        secondary: '#474056',
        tertiary: '#474056',
        emphasis: '#B9C6AE',
      },
    },
  },
  plugins: [],
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
};