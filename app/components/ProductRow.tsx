import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import prisma from '../lib/db';
import ProductCard, { ProductCardLoading } from './ProductCard';

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

const ProductRow = ({ category }: Props) => {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
};

const LoadRows = async ({ category }: Props) => {
  const data = await getData({ category });

  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter ">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="hidden text-sm font-medium text-primary hover:text-primary/90 md:block"
        >
          All {data.title === 'Newest Products' ? 'Products' : data.title}{' '}
          <span>&rarr;</span>
        </Link>
      </div>
      <div className="gird-cols-1 mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

const LoadingState = () => {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </div>
    </div>
  );
};

export default ProductRow;
