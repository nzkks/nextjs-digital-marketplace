import Link from 'next/link';
import { LogIn } from 'lucide-react';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

import { Button } from '@/components/ui/button';
import NavbarLinks from './NavbarLinks';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  return (
    <nav className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-7 md:grid md:grid-cols-12 md:px-8">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold ">
            <span className="text-primary">NZ</span>KKS
          </h1>
        </Link>
      </div>

      <NavbarLinks />

      <div className="ms-auto flex items-center gap-x-2 md:col-span-3">
        <Button size="icon" asChild>
          <LoginLink>
            <LogIn className="h-4 w-4" />
          </LoginLink>
        </Button>
        <Button variant="secondary">
          <RegisterLink>Register</RegisterLink>
        </Button>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
