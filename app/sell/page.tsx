import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Card } from '@/components/ui/card';
import SellForm from '../components/form/SellForm';

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Not authorized...');

  return (
    <section className="mx-auto mb-14 max-w-7xl px-4 md:px-8">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
};

export default page;
