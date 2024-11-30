import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import { validateHandle } from './app/types/handle';
import remarkReactRouerFrontmatter from './scripts/remark-react-router-frontmatter';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          [remarkFrontmatter],
          [
            remarkReactRouerFrontmatter,
            {
              meta: (frontmatter: unknown) => {
                const result = validateHandle(frontmatter);

                if (!result.success) {
                  throw new Error(
                    `invalid frontmatter: \`${JSON.stringify(frontmatter)}\``,
                    {
                      cause: result.error,
                    },
                  );
                }

                const {
                  data: { title, description },
                } = result;

                return [
                  { title: `${title} | MdsiteStack` },
                  {
                    name: 'description',
                    content: description,
                  },
                  {
                    property: 'og:title',
                    content: `${title} | MdsiteStack`,
                  },
                  { property: 'og:type', content: 'website' },
                  { property: 'og:url', content: 'http://localhost' }, //TODO その他プロパティなども
                ];
              },
            },
          ],
          [remarkGfm],
        ],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              defaultLanguage: 'txt',
              themes: {
                light: 'github-light-default',
                dark: 'github-dark-default',
              },
            },
          ],
        ],
      }),
    },
    reactRouter(),
    tsconfigPaths(),
  ],
});
