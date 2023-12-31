import { stripe } from '../app.js';
import Stripe from 'stripe';

// Creates a stripe checkout session with ine items
export async function createStripeCheckoutSession(line_items) {
  const url = process.env.WEBAPP_URL;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/failed`,
  });

  return session;
}
