'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navbarLinks } from './NavbarLinks';

const MobileMenu = () => {
  const location = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-5 flex flex-col space-y-1 px-2">
          {navbarLinks.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={cn(
                location === item.href
                  ? 'bg-muted'
                  : 'hover:bg-muted hover:bg-opacity-75',
                'group flex items-center rounded-md px-2 py-2 font-medium',
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
