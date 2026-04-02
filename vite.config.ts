import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(),
              tailwindcss()],
    server: {
            port: 8080,
            strictPort: true,
            host: true,
            origin: "http://0.0.0.0:8080",
    },
	build: {
		outDir: "dist", // Output directory will be 'build' instead of 'dist'
		minify: "terser",
		terserOptions: {
			// You can customize Terser options here
			// For example, to enable obfuscation:
			format: {
				comments: false,
			},
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
			mangle: {
				toplevel: true,
			},
		},
	},
});
