import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Card } from '@/components/ui/card';
import SellForm from '../components/form/SellForm';
import prisma from '../lib/db';
import { redirect } from 'next/navigation';

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    return redirect('/billing');
  }

  return null;
};

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Not authorized...');

  await getData(user.id);

  return (
    <section className="mx-auto mb-14 max-w-7xl px-4 md:px-8">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
};

export default page;
