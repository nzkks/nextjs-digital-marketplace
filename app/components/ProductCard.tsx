import Image from 'next/image';

type Props = {
  id: string;
  name: string;
  price: number;
  images: string[];
  smallDescription: string;
};

const ProductCard = ({ id, name, price, images, smallDescription }: Props) => {
  return (
    <div className="rounded-lg">
      <div className="relative h-[230px]">
        <Image
          alt={name}
          src={images[0]}
          fill
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset  ring-primary/10">
          ${price}
        </h3>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
        {smallDescription}
      </p>
    </div>
  );
};

export default ProductCard;
