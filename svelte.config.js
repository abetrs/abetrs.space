import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	kit: {
		adapter: adapter(),
		paths: {
			base: '' // Adjust if your app is deployed under a subdirectory
		}
	},
	preprocess: vitePreprocess()
};
