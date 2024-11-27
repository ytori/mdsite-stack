import { Link } from 'react-router';
import { validateHandle } from '~/types/handle';

function MyLink({ href, ...other }: React.ComponentProps<'a'>) {
  //TODO Remark側で拡張子はいじる
  return <Link {...other} to={href?.replace('.mdx', '') ?? ''} />;
}

function ContentWrapper({
  children,
  matches,
}: {
  children: React.ReactNode;
  matches: Record<string, unknown>[];
}) {
  const result = validateHandle(matches[matches.length - 1].handle);

  if (!result.success) {
    throw new Error('invalid frontmatter', {
      cause: result.error,
    });
  }

  return (
    <>
      <h1>{result.data.title}</h1>
      {children}
    </>
  );
}

export const components = {
  a: MyLink,
  wrapper: ContentWrapper,
} as const;
