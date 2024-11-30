import { ComponentProps, forwardRef } from 'react';
import { Link } from 'react-router';
import { validateHandle } from '~/types/handle';

const Anchor = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(
  function ReactRouterLink({ href = '', ...props }, forwardedRef) {
    return <Link {...props} to={href} ref={forwardedRef} />;
  },
);

Anchor.displayName = 'Anchor';

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
  a: Anchor,
  wrapper: ContentWrapper,
} as const;
