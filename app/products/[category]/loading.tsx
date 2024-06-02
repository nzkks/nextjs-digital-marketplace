import { ProductCardLoading } from '@/app/components/ProductCard';

const loading = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
        <ProductCardLoading />
      </div>
    </div>
  );
};

export default loading;
