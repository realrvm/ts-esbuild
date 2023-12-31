import esbuild from 'esbuild';
import { createBuildSettings } from './settings.js';

const settings = createBuildSettings({
  sourcemap: true,
  banner: {
    js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`,
  }
});

const ctx = await esbuild.context(settings);

await ctx.watch();

const { host, port } = await ctx.serve({
  host: 'localhost',
  port: 5173,
  servedir: 'dist',
  fallback: "dist/index.html"
});

console.log(`Serving app at ${host}:${port}.`);
