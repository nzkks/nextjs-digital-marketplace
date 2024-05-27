import Link from 'next/link';

import NavbarLinks from './NavbarLinks';

const Navbar = () => {
  return (
    <nav className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-7 md:grid md:grid-cols-12 md:px-8">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold ">NZKKS</h1>
        </Link>
      </div>

      <NavbarLinks />
    </nav>
  );
};

export default Navbar;
