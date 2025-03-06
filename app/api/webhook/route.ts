import { ALL_TIERS } from '@/config/tiers';
import { createClerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: 'Webhook Error' }, { status: 400 });
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription;
      const stripeCustomerId = subscription.customer as string;

      try {
        // 查找对应的计划
        const plan = Object.values(ALL_TIERS).flat().find(tier => tier.plan_id === subscription.items.data[0].price.id);

        if (!plan) {
          console.log(`未找到与 plan_id 对应的计划: ${subscription.items.data[0].price.id}`);
          return NextResponse.json({ message: 'Plan not found' }, { status: 400 });
        }

        // 使用 clerkClient.users.getUserList
        const usersResponse = await clerkClient.users.getUserList({
          externalId: [stripeCustomerId],
        });

        if (usersResponse.data.length > 0) {
          const user = usersResponse.data[0];
          // 使用 clerkClient.users.updateUser
          await clerkClient.users.updateUser(user.id, {
            publicMetadata: {
              subscriptionStatus: subscription.status,
              subscriptionId: subscription.id,
              planKey: plan.key
            },
          });
        } else {
          console.log(`未找到与 Stripe 客户 ID 对应的用户: ${stripeCustomerId}`);
        }
      } catch (error) {
        console.error('更新用户订阅状态时出错:', error);
      }
      break;
    default:
      console.log(`未处理的事件类型 ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
