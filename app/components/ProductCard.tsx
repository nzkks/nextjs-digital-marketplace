import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';

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
      <Carousel className="mx-auto w-full">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px]">
                <Image
                  alt="Product image"
                  src={item}
                  fill
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset  ring-primary/10">
          ${price}
        </h3>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
        {smallDescription}
      </p>

      <Button asChild className="mt-5 w-full">
        <Link href={`/product/${id}`}>Learn More!</Link>
      </Button>
    </div>
  );
};

export default ProductCard;
