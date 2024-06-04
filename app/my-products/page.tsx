import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { unstable_noStore as noStore } from 'next/cache';

import prisma from '../lib/db';
import ProductCard from '../components/ProductCard';

const getData = async (userId: string) => {
  const data = await prisma.product.findMany({
    where: {
      userId,
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

const MyProductsRoute = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Not authorized...');

  const data = await getData(user.id);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <h1 className="text-2xl font-bold">My Products</h1>
      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default MyProductsRoute;
