import Link from 'next/link';
import prisma from '../lib/db';
import ProductCard from './ProductCard';

const getData = async () => {
  const data = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
      images: true,
      smallDescription: true,
    },
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
};

const NewestProducts = async () => {
  const products = await getData();

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

export default NewestProducts;
