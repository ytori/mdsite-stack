export function generateMeta(props?: { title?: string; description?: string }) {
  const title = props?.title ? `${props.title} | MDSite Stack` : 'MDSite Stack';
  const description =
    props?.description ??
    'MDSite Stack is a simple and customizable template for creating documentation sites with React Router v7.';

  return [
    { title: title },
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: '/mdsitestack-ogp.png',
    },
    {
      property: 'twitter:card',
      content: 'summary',
    },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
    {
      property: 'twitter:image',
      content: '/mdsitestack-ogp.png',
    },
  ];
}
