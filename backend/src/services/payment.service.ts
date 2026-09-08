import Stripe from 'stripe';
import { config } from '../config';
import { logger } from '../utils/logger';
import db from '../database/connection';
import { AppError } from '../middleware/errorHandler';

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2023-10-16',
});

export class PaymentService {
  async createCheckoutSession(userId: string, priceId: string) {
    try {
      const user = await db('users').where({ id: userId }).first();
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${config.frontend.url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.frontend.url}/payment/cancel`,
        customer_email: user.email,
        metadata: {
          userId: user.id,
        },
      });

      logger.info(`Checkout session created: ${session.id}`);

      return { sessionId: session.id, url: session.url };
    } catch (error) {
      logger.error('Checkout session creation failed:', error);
      throw new AppError('Failed to create checkout session', 500);
    }
  }

  async createFeaturedListingSession(userId: string, itemId: string, duration: number) {
    try {
      const user = await db('users').where({ id: userId }).first();
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const item = await db('items').where({ id: itemId, seller_id: userId }).first();
      if (!item) {
        throw new AppError('Item not found', 404);
      }

      // Calculate price based on duration
      const priceMap = {
        7: 299, // $2.99
        14: 499, // $4.99
        30: 999, // $9.99
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Featured Listing - ${duration} days`,
                description: `Feature your item "${item.title}" for ${duration} days`,
              },
              unit_amount: priceMap[duration as keyof typeof priceMap],
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${config.frontend.url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.frontend.url}/payment/cancel`,
        customer_email: user.email,
        metadata: {
          userId: user.id,
          itemId: item.id,
          duration: duration.toString(),
          type: 'featured_listing',
        },
      });

      logger.info(`Featured listing session created: ${session.id}`);

      return { sessionId: session.id, url: session.url };
    } catch (error) {
      logger.error('Featured listing session creation failed:', error);
      throw new AppError('Failed to create checkout session', 500);
    }
  }

  async handleWebhook(signature: string, payload: string) {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        config.stripe.webhookSecret
      );

      logger.info(`Webhook received: ${event.type}`);

      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(event.data.object);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object);
          break;
        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object);
          break;
        default:
          logger.info(`Unhandled event type: ${event.type}`);
      }

      return { received: true };
    } catch (error) {
      logger.error('Webhook handling failed:', error);
      throw new AppError('Webhook handling failed', 400);
    }
  }

  private async handleCheckoutCompleted(session: any) {
    const { userId, itemId, duration, type } = session.metadata;

    if (type === 'featured_listing' && itemId) {
      // Feature the item
      await db('items')
        .where({ id: itemId })
        .update({
          featured: true,
          featured_until: new Date(Date.now() + Number(duration) * 24 * 60 * 60 * 1000),
        });

      logger.info(`Item featured: ${itemId} for ${duration} days`);
    } else if (userId) {
      // Handle subscription
      logger.info(`Subscription activated for user: ${userId}`);
    }
  }

  private async handleSubscriptionDeleted(subscription: any) {
    const userId = subscription.metadata?.userId;
    if (userId) {
      await db('users').where({ id: userId }).update({ role: 'user' });
      logger.info(`Subscription cancelled for user: ${userId}`);
    }
  }

  private async handlePaymentFailed(invoice: any) {
    const userId = invoice.metadata?.userId;
    if (userId) {
      logger.warn(`Payment failed for user: ${userId}`);
      // Send notification email
    }
  }

  async createCustomerPortalSession(userId: string) {
    try {
      const user = await db('users').where({ id: userId }).first();
      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Find or create Stripe customer
      let customerId = user.stripe_customer_id;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: { userId: user.id },
        });
        customerId = customer.id;
        await db('users').where({ id: userId }).update({ stripe_customer_id: customerId });
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${config.frontend.url}/settings/billing`,
      });

      return { url: session.url };
    } catch (error) {
      logger.error('Customer portal session creation failed:', error);
      throw new AppError('Failed to create customer portal session', 500);
    }
  }
}

export const paymentService = new PaymentService();
