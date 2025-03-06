import { clerkClient } from "@clerk/clerk-sdk-node";
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { plan_id } = await request.json() as { plan_id: string };

    if (!plan_id || typeof plan_id !== 'string') {
      return NextResponse.json({ message: 'Invalid plan_id' }, { status: 400 });
    }

    // 获取用户的 Stripe 客户 ID（假设存储在 Clerk 的用户元数据中）
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    let customerId = user.privateMetadata.stripeCustomerId as string;

    if (!customerId) {
      // 如果用户没有 Stripe 客户 ID，创建一个新的
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });
      customerId = customer.id;

      // 使用 clerkClient 更新用户的私有元数据
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { stripeCustomerId: customerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: plan_id, quantity: 1 }],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/api/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/canceled`,
    });

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error('Error in create-checkout-session:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
