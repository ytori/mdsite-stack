import type { MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import { ThemeToggleButton } from '~/components/theme';

export const meta: MetaFunction = () => {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
};

export default function Home() {
  return (
    <div className="mx-auto text-center">
      <h1>This is home</h1>
      <Button>Button</Button>
      <ThemeToggleButton />
    </div>
  );
}
