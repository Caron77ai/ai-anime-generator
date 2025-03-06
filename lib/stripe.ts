import { createClerkClient } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

export async function getSubscriptionInfo(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    const stripeCustomerId = user.privateMetadata.stripeCustomerId as string;

    if (!stripeCustomerId) {
      return null;
    }

    // 获取用户的订阅信息
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'all',
      expand: ['data.plan.product'],
    });

    let subscriptionInfo = null;
    if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0];
      const plan = subscription.items.data[0].plan;
      subscriptionInfo = {
        planName: (plan.product as Stripe.Product).name,
        status: subscription.status,
        nextBillingDate: new Date(subscription.current_period_end * 1000).toLocaleDateString(),
      };
    }

    // 获取最近的发票记录
    const invoices = await stripe.invoices.list({
      customer: stripeCustomerId,
      limit: 10,
      expand: ['data.subscription', 'data.charge'],
    });

    const recentTransactions = invoices.data.map(invoice => {
      const subscription = invoice.subscription as Stripe.Subscription;
      const plan = subscription?.items.data[0].plan;
      return {
        id: invoice.id,
        amount: invoice.amount_paid / 100,
        currency: invoice.currency,
        date: new Date(invoice.created * 1000).toLocaleString(),
        status: invoice.status,
        planName: (plan?.product as Stripe.Product)?.name || 'Unknown Plan',
        periodStart: new Date(subscription?.current_period_start * 1000).toLocaleDateString(),
        periodEnd: new Date(subscription?.current_period_end * 1000).toLocaleDateString(),
        paymentMethod: invoice.charge ? (invoice.charge as Stripe.Charge).payment_method_details?.type : 'Unknown',
      };
    });

    return {
      ...subscriptionInfo,
      recentTransactions,
    };
  } catch (error) {
    console.error('Error in getSubscriptionInfo:', error);
    return null;
  }
}
