'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { z } from 'zod';

export interface State {
  status: 'error' | 'success' | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
}

const productSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters long' }),
  category: z.string().min(1, { message: 'Category must be selected' }),
  price: z
    .number({ required_error: 'Price is required' })
    .min(1, { message: 'Price must be greater than 0' }),
  smallDescription: z
    .string({ required_error: 'Small description is required' })
    .min(10, { message: 'Summaraize your product' }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, { message: 'Description must be at least 10 characters long' }),
  images: z.array(z.string(), { required_error: 'Images are required' }),
  productFile: z
    .string()
    .min(1, { message: 'Pleaes upload a zip of your product' }),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Something went wromg...');
  }
  const validateFields = await productSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    price: Number(formData.get('price')),
    smallDescription: formData.get('smallDescription'),
    description: formData.get('description'),
    images: JSON.parse(formData.get('images') as string),
    productFile: formData.get('productFile'),
  });

  if (!validateFields.success) {
    const state: State = {
      status: 'error',
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Oops, I think there is a mistake with your inputs.',
    };

    return state;
  }
}
