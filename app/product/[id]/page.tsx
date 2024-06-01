import Image from 'next/image';
import prisma from '@/app/lib/db';
import { JSONContent } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductDescription from '@/app/components/ProductDescription';

const getdata = async (id: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      category: true,
      description: true,
      smallDescription: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      id: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const data = await getdata(params.id);

  return (
    <section className="mx-auto max-w-7xl  px-4 lg:mt-10 lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 lg:px-8 xl:gap-x-16">
      <Carousel className=" lg:col-span-4 lg:row-end-1">
        <CarouselContent>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item as string}
                  alt="Product image"
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

      <div className="mx-auto mt-5 max-w-2xl lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
        <h1 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
          {data?.name}
        </h1>

        <p className="mt-2 text-muted-foreground">{data?.smallDescription}</p>

        <Button size="lg" className="mt-10 w-full">
          Buy for ${data?.price}
        </Button>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <div className="grid w-full grid-cols-2 gap-y-3">
            <h3 className="col-span-1 text-sm font-medium text-muted-foreground">
              Released:
            </h3>
            <h3 className="col-span-1 text-sm font-medium">
              {new Intl.DateTimeFormat('en-NZ', {
                dateStyle: 'long',
              }).format(data?.createdAt)}
            </h3>

            <h3 className="col-span-1 text-sm font-medium text-muted-foreground">
              Category:
            </h3>

            <h3 className="col-span-1 text-sm font-medium">{data?.category}</h3>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200"></div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
        <ProductDescription content={data?.description as JSONContent} />
      </div>
    </section>
  );
};

export default ProductPage;
