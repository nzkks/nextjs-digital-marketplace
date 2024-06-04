import { notFound } from 'next/navigation';
import { type CategoryTypes } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/db';
import ProductCard from '@/app/components/ProductCard';

const getData = async (category: string) => {
  let input;

  switch (category) {
    case 'template':
      input = 'template';
      break;
    case 'uikit':
      input = 'uikit';
      break;
    case 'icon':
      input = 'icon';
      break;
    case 'all':
      input = undefined;
      break;

    default:
      return notFound();
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      smallDescription: true,
    },
  });

  return data;
};

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  noStore();
  const data = await getData(params.category);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
