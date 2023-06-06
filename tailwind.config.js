/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					btn: {
						100: "#31C3BD",
						200: "#65E9E4",
					},
					bg: {
						100: "#1A2A33",
						200: "#1F3641",
					},
				},
				secondary: {
					btn: {
						100: "#F2B137",
						200: "#FFC860",
						300: "#A8BFC9",
						400: "#DBE8ED",
					},
				},
			},
			fontFamily: {
				default: ["outfit", "mono"],
			},
			screens: {
				lg: "1440px",
			},
		},
	},
	plugins: [],
};
