import type { RouteConfig } from '@react-router/dev/routes';
import { index, layout, route } from '@react-router/dev/routes';

const docsRoutes = Object.keys(
  import.meta.glob('./routes/docs/**/*.{md,mdx}', {
    query: '?url',
    eager: true,
  }),
)
  .map((file) => {
    return {
      path: file
        .replace('./routes/docs/', 'docs/')
        .replace(/\.(mdx|md)$/, '')
        .replaceAll(/\/\d+-/g, '/'),
      file,
    };
  })
  .map(({ path, file }) => route(path, file));

export default [
  index('routes/home.tsx'),
  layout('routes/docs/_layout.tsx', docsRoutes),
] satisfies RouteConfig;
