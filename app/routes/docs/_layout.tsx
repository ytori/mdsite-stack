import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';
import { Link, Outlet } from 'react-router';
import { validateHandle } from '~/types/handle';
import type { Route } from './+types/_layout';

interface NavItem {
  title: string;
  url: string;
}

export async function loader() {
  const { routes } = await import('virtual:react-router/server-build');

  return Object.values(routes)
    .filter(({ path }) => path?.startsWith('docs/'))
    .map(({ path, module }) => {
      const result = validateHandle(module.handle);
      if (!result.success) {
        throw new Error('invalid frontmatter', {
          cause: result.error,
        });
      }
      return {
        url: path!,
        title: result.data.title,
      } satisfies NavItem;
    });
}

function TableOfContents({
  navItems,
  onClick,
}: {
  navItems: NavItem[];
  onClick?: () => void;
}) {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Button
          key={item.title}
          asChild
          variant="link"
          className="block h-fit whitespace-normal"
        >
          <Link to={item.url} onClick={onClick}>
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

function TableOfContentsDrawer({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Drawer
      open={isOpen}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open menu"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Menu className="size-5" />
      </Button>
      <DrawerContent>
        <div className="max-h-[50vh] min-h-[30vh] overflow-y-scroll p-4">
          <TableOfContents
            navItems={navItems}
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function DesktopSidebr({ navItems }: { navItems: NavItem[] }) {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 md:block">
      <ScrollArea className="h-full">
        <div className="py-8">
          <TableOfContents navItems={navItems} />
        </div>
      </ScrollArea>
    </aside>
  );
}

export default function Documentation({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header menu={<TableOfContentsDrawer navItems={loaderData} />} />
      <div className="container mx-auto flex">
        <DesktopSidebr navItems={loaderData} />
        <main className="grow px-4 py-8 md:pl-10">
          <div className="prose max-w-none dark:prose-invert">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}