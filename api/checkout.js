const stripeAPI = require('stripe')('sk_test_51OA1jTEHw9uxmrwPRM2BUP4DfieobdKSzSP3C5R1WI4IZ7l67hC3ykxtUdJXfPRVZrJQOGCqDYwpljwbGjBl0M6500R2grO2RP');

async function createCheckoutSession(req) {
  const domainUrl = 'https://dreamy-jelly-46ee6f.netlify.app';
  const { line_items, customer_email } = req;
  // Check if req has line items and email
  if (!line_items || !customer_email) {
    throw new Error('Missing required session parameters');
  }

  try {
    const session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ['GB', 'US'] }
    });

    return { status: 200, sessionId: session.id };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = createCheckoutSession;
