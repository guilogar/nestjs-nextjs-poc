import type { NextPage } from 'next'
import NextLink from 'next/link'

const Link: NextPage<{
  href: any, className?: string
}> = (
  { href, children, ...props }
) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;