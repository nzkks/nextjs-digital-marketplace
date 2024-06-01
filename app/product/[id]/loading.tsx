import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-8">
      <div className="grid w-full grid-cols-1 gap-x-10 md:grid-cols-2">
        <div className="col-span-1">
          <Skeleton className="h-[250px] w-full lg:h-[400px]" />
          <Skeleton className="mt-10 h-[500px] w-full" />
        </div>

        <div className="col-span-1">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </section>
  );
};

export default loading;
