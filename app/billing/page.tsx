import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { unstable_noStore as noStore } from 'next/cache';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import prisma from '../lib/db';
import { SubmitButton } from '../components/SubmitButtons';
import { CreateStripeAccountLink, GetStripeDashboardLink } from '../actions';

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  return data;
};

const BillingsRoutePage = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Not authorized...');

  const data = await getData(user.id);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Find all details regarding your payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.stripeConnectedLinked === false && (
            <form action={CreateStripeAccountLink}>
              <SubmitButton title="Link your Account to stripe" />
            </form>
          )}

          {data?.stripeConnectedLinked === true && (
            <form action={GetStripeDashboardLink}>
              <SubmitButton title="View Dashboard" />
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default BillingsRoutePage;
