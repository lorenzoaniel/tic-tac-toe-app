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
					text: {
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
			fontSize: {
				"heading-l": ["4rem", { letterSpacing: "0.25rem", lineHeight: "5rem", fontWeight: 700 }],
				"heading-m": ["2.4rem", { letterSpacing: "0.15rem", lineHeight: "3rem", fontWeight: 700 }],
				"heading-s": ["2rem", { letterSpacing: "0.125rem", lineHeight: "2.5rem", fontWeight: 700 }],
				"heading-xs": ["1.6rem", { letterSpacing: "0.1rem", lineHeight: "2rem", fontWeight: 700 }],
				body: ["1.4rem", { letterSpacing: "0.0875rem", lineHeight: "1.8rem", fontWeight: 500 }],
			},
			screens: {
				lg: "1440px",
			},
		},
	},
	plugins: [],
};
