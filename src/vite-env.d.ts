/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_DETAILS_URL: string;
	// Add other VITE_ variables here as needed
	// readonly VITE_OTHER_VAR: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
