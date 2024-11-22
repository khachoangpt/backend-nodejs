import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['server.ts'],
	clean: true,
	format: ['esm'],
	splitting: true,
})
