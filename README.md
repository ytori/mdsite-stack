# MDSite Stack

**M**ark**D**own + Static **Site** Generation = **MDSite** Stack

## What is this?

MDSite Stack is a simple and customizable template for creating documentation sites with [React Router v7](https://reactrouter.com/).

## Live Demo

https://mdsite-stack.vercel.app

## Quick Start

```sh
npx create-react-router@latest --template ytori/mdsite-stack
```

## Features

- Easily create documentation sites from Markdown
- Simple, minimal, and easy to understand and customize
- Faster initial load due to React Router v7's new [prerender feature](https://reactrouter.com/how-to/pre-rendering)

## Architecture

- [React Router v7](https://reactrouter.com/)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/) & [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [shadcn/ui](https://ui.shadcn.com/)

Inspired by [remix-blog-mdx](https://github.com/pcattori/remix-blog-mdx). For the same reason, MDX is handled at build time.
