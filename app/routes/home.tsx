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
          <h2 className="mb-8 text-5xl font-extrabold leading-tight">
            Build Documentation Sites with Ease
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-800 dark:text-gray-200">
            MDSite Stack is a simple and customizable template for creating
            documentation sites with React Router v7.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button asChild variant="default">
              <Link to="/docs/introduction">Get Started</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/docs/installation">Installation</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
