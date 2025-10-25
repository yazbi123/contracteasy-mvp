// Stripe Service for production payments
import { loadStripe } from '@stripe/stripe-js';

class StripeService {
  constructor() {
    this.stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    this.apiKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
  }

  // Create checkout session
  async createCheckoutSession(priceId, customerEmail, successUrl, cancelUrl) {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerEmail,
          successUrl,
          cancelUrl
        })
      });

      const session = await response.json();
      return session;
    } catch (error) {
      console.error('Erreur lors de la création de la session Stripe:', error);
      throw error;
    }
  }

  // Redirect to checkout
  async redirectToCheckout(sessionId) {
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId
    });

    if (error) {
      console.error('Erreur lors de la redirection Stripe:', error);
      throw error;
    }
  }

  // Create customer portal session
  async createCustomerPortalSession(customerId, returnUrl) {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl
        })
      });

      const session = await response.json();
      return session;
    } catch (error) {
      console.error('Erreur lors de la création du portail client:', error);
      throw error;
    }
  }

  // Verify webhook signature
  verifyWebhookSignature(payload, signature) {
    const stripe = require('stripe')(this.apiKey);
    const webhookSecret = import.meta.env.VITE_STRIPE_WEBHOOK_SECRET;
    
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      return event;
    } catch (error) {
      console.error('Erreur de vérification webhook Stripe:', error);
      throw error;
    }
  }
}

export default new StripeService();
