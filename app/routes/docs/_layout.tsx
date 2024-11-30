import { useState } from 'react';
import { Menu } from 'lucide-react';
import { buttonVariants, Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '~/components/ui/drawer';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';
import { NavLink, Outlet } from 'react-router';
import { validateHandle } from '~/types/handle';
import type { Route } from './+types/_layout';
import { cn } from '~/lib/utils';

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
        <NavLink
          key={item.title}
          to={item.url}
          onClick={onClick}
          className={({ isActive }) =>
            cn(
              buttonVariants({
                variant: 'link',
              }),
              'block h-fit whitespace-normal break-all',
              isActive && 'font-extrabold',
            )
          }
        >
          {item.title}
        </NavLink>
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
        <VisuallyHidden asChild>
          <DrawerTitle>Menu</DrawerTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DrawerDescription>Table of Contents</DrawerDescription>
        </VisuallyHidden>
        <div className="max-h-[50vh] overflow-y-scroll p-4 py-8">
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
      <div className="container mx-auto flex grow">
        <DesktopSidebr navItems={loaderData} />
        <main className="w-full grow px-4 py-8 md:pl-10">
          <div className="prose max-w-none break-all dark:prose-invert">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
