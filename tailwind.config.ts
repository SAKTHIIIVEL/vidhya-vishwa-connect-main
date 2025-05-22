import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				hovBlue:'#54678C',
				cutBlue: '#7786D9',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New color palette from the image
				"inlustro-blue": {
					light: "#B6CAF2", // Lighter blue from image
					DEFAULT: "#5F65D9", // Main purple-blue from image
					dark: "#54678C" // Darker blue-gray from image
				},
				"inlustro-yellow": {
					light: "#FEF7CD",
					DEFAULT: "#F9E559",
					dark: "#F7DD1E"
				},
				"inlustro-gray": {
					light: "#B6CAF2", // Light blue-gray
					DEFAULT: "#54678C", // Darker slate blue
					dark: "#333333"
				},
				"inlustro-purple": {
					DEFAULT: "#5F65D9" // Purple from the image
				},
				"inlustro-mint": {
					DEFAULT: "#6DA681" // Green from the image
				},
				edu: {
					blue: "#1E65F3", // Main accent blue
					green: "#A0D2DB", // Changed to a light blue/cyan
					orange: "#D6EAF8", // Changed to a very light blue
					lightBlue: "#E1EFFE", // Kept as a light blue
					lightGreen: "#E7F5F7", // Derived from new edu.green
					lightOrange: "#F4F9FC"  // Derived from new edu.orange
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-gentle': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.85'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'pulse-gentle': 'pulse-gentle 3s infinite ease-in-out',
				'float': 'float 3s infinite ease-in-out'
			},
			fontFamily: {
				nunito: ['Nunito', 'sans-serif']
			},
			boxShadow: {
				'inlustro': '0 4px 20px rgba(0, 0, 0, 0.08)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
