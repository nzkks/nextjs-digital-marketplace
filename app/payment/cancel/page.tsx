import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const PaymentCancelRoute = () => {
  return (
    <section className="flex min-h-[80vh] w-full items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full justify-center">
            <XCircle className="h-12 w-12 rounded-full bg-red-500/30 p-2 text-red-500" />
          </div>
          <div className="mt-3 w-full text-center sm:mt-5">
            <h3 className="text-lg font-medium leading-6">Payment Canceled</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong with your payment. You havent been charged.
              Please try again.
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

export default PaymentCancelRoute;
