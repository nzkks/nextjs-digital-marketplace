'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { type CategoryTypes } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import prisma from './lib/db';
import { stripe } from './lib/stripe';

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

  const data = await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      price: validateFields.data.price,
      smallDescription: validateFields.data.smallDescription,
      description: JSON.parse(validateFields.data.description),
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
    },
  });

  return redirect(`/product/${data.id}`);
}

const userSettingsSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(3, { message: 'First name must be at least 3 characters long' }),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(3, { message: 'Last name must be at least 3 characters long' }),
});

export async function UpdateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('Something went wromg...');
  }

  const validateFields = await userSettingsSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  });

  if (!validateFields.success) {
    const state: State = {
      status: 'error',
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Oops, I think there is a mistake with your inputs.',
    };

    return state;
  }

  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: 'success',
    message: 'Your profile settings has been updated!',
  };

  return state;
}

export async function BuyProduct(formData: FormData) {
  const id = formData.get('id') as string;
  const data = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      price: true,
      images: true,
      smallDescription: true,
      productFile: true,
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'nzd',
          unit_amount: Math.round((data?.price as number) * 100),
          product_data: {
            name: data?.name as string,
            images: data?.images,
            description: data?.smallDescription,
          },
        },
        quantity: 1,
      },
    ],
    // metadata: {
    //   link: data?.productFile as string,
    // },
    success_url: 'http://localhost:3000/payment/success',
    cancel_url: 'http://localhost:3000/payment/cancel',
  });

  return redirect(session.url as string);
}

export const CreateStripeAccountLink = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error('Something went wromg...');

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccountId as string,
    refresh_url: 'http://localhost:3000/billing',
    return_url: `http://localhost:3000/return/${data?.connectedAccountId}`,
    type: 'account_onboarding',
  });

  return redirect(accountLink.url);
};

export const GetStripeDashboardLink = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error('Something went wromg...');

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(
    data?.connectedAccountId as string,
  );

  return redirect(loginLink.url);
};
