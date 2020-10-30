import stripePackage from 'stripe';
import handler from './libs/handler-lib';
import { calculateCost } from './libs/billing-lib';

export const main = handler(async (event, context) => {
  // storage -> notes number to store
  // source -> stripe token for the card to charge
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  // Load secret key
  const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd',
  });

  return { status: true };
});
