module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				main: ['"Inconsolata"', 'monospace'],
				'press-start': ['"Major Mono Display"', 'monospace']
			},
			fontSize: {
				xxs: '.6rem'
			},
			colors: {
				dark: '#333330',
				dark2: '#1c1c19',
				light: '#66665f',
				secondary: '#474056',
				tertiary: '#474056',
				emphasis: '#B9C6AE',
				silver: '#C4CBCA',
				pink: '#EE4266',
				violet: '#2A1E5C',
				teal: '#3CBBB1'
			}
		}
	},
	plugins: [],
	mode: 'jit',
	purge: ['./src/**/*.svelte']
};
