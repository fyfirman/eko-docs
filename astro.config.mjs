import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	base: '/docs',
	integrations: [
		starlight({
			title: 'Eko Docs',
			social: {
				github: 'https://github.com/FellouAI/eko',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Overview', slug: 'getting-started/eko' },
						{ label: 'Quickstart', slug: 'getting-started/quickstart' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Configuration', slug: 'getting-started/configuration' },
					],
				},
				{
					label: 'Browser use',
					items: [
						{ label: 'Browser Extension', slug: 'getting-started/browser-extension' },
						{ label: 'Web', slug: 'getting-started/browser-extension' },
					],
				},
				{
					label: 'Computer use',
					items: [
						{ label: 'Node.js', slug: 'getting-started/browser-extension' },
						{ label: 'Fellou', slug: 'getting-started/browser-extension' },
					],
				},
				{
					label: 'Tools',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Overview', slug: 'getting-started/eko' },
						{ label: 'Available tools', slug: 'getting-started/eko' },
						{ label: 'Custom tools', slug: 'getting-started/eko' },
						{ label: 'Tools hook', slug: 'getting-started/eko' },
					],
				},
				{
					label: 'Architecture',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Overview', slug: 'getting-started/eko' },
						{ label: 'Two-Layer Execution Model', slug: 'getting-started/eko' },
						{ label: 'Workflow', slug: 'getting-started/eko' },
						{ label: 'Human in the loop', slug: 'getting-started/eko' },
						{ label: 'Web Extraction Technology', slug: 'getting-started/eko' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Release',
					items: [
						{ label: 'Roadmap', slug: 'release/overview' },
						{ label: 'Versions', slug: 'release/overview' },
					]
				},
			],
		}),
	],
});
