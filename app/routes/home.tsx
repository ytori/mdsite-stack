import { Link, type MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';

export const meta: MetaFunction = () => {
  return [
    { title: 'MdSite Stack' },
    { name: 'description', content: 'Welcome to MdSite Stack!' },
  ];
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex grow flex-col items-center justify-center">
        <section className="px-4 text-center">
          <h2 className="mb-8 text-5xl font-bold leading-tight">
            Build Documentation Sites with Ease
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-800 dark:text-gray-200">
            MDSite Stack is a powerful, flexible stack for creating beautiful
            documentation websites using Markdown and{' '}
            <Link to="https://reactrouter.com" reloadDocument>
              React Rouer v7
            </Link>
            .
          </p>
          <Button asChild size="lg">
            <Link to="/docs/hello">Get Started</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
