import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ReturnURLStripe = () => {
  return (
    <section className="flex min-h-[80vh] w-full items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full justify-center">
            <Check className="h-12 w-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>
          <div className="mt-3 w-full text-center sm:mt-5">
            <h3 className="text-lg font-medium leading-6">
              Linking was Successful
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats on linking your account to NZKKS marketplace. You can now
              start selling your products!
            </p>

            <Button className="mt-5 w-full sm:mt-6" asChild>
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ReturnURLStripe;
