import Stripe from 'stripe';
import { headers } from 'next/headers';
import { Resend } from 'resend';

import { stripe } from '@/app/lib/stripe';
import ProductEmail from '@/app/components/ProductEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event;

  try {
    event = await stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (error: unknown) {
    return new Response(`Webhook Error`, {
      status: 400,
    });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const link = session.metadata?.link;

      const { data, error } = await resend.emails.send({
        from: 'NZKKS Digital Marketplace <onboarding@resend.dev>',
        to: ['nzkksdemo@gmail.com'],
        subject: 'Your Product Link from NZKKS Digital Marketplace',
        react: ProductEmail({
          link: link as string,
        }),
      });
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
