import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <CardHeader className="h-[500px]">
          <Skeleton className="h-full w-full" />
        </CardHeader>
      </Card>
    </div>
  );
};

export default loading;
