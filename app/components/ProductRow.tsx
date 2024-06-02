import Link from 'next/link';
import ProductCard from './ProductCard';
import prisma from '../lib/db';
import { notFound } from 'next/navigation';

type Props = {
  category: 'newest' | 'templates' | 'uikits' | 'icons';
};

const getData = async ({ category }: Props) => {
  switch (category) {
    case 'newest': {
      const data = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          smallDescription: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 3,
      });

      return {
        data,
        title: 'Newest Products',
        link: '/products/all',
      };
    }
    case 'templates': {
      const data = await prisma.product.findMany({
        where: {
          category: 'template',
        },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          smallDescription: true,
        },
        take: 3,
      });

      return {
        data,
        title: 'Templates',
        link: '/products/template',
      };
    }
    case 'uikits': {
      const data = await prisma.product.findMany({
        where: {
          category: 'uikit',
        },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          smallDescription: true,
        },
        take: 3,
      });

      return {
        data,
        title: 'UI Kits',
        link: '/products/uikit',
      };
    }
    case 'icons': {
      const data = await prisma.product.findMany({
        where: {
          category: 'icon',
        },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          smallDescription: true,
        },
        take: 3,
      });

      return {
        data,
        title: 'Icons',
        link: '/products/icon',
      };
    }

    default:
      return notFound();
  }
};

const ProductRow = async ({ category }: Props) => {
  const { data: products } = await getData({ category });

  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter ">
          Newest Products
        </h2>
        <Link
          href="#"
          className="hidden text-sm font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>

      <div className="gird-cols-1 mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductRow;
