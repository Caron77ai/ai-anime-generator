import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ message: 'Invalid session ID' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ message: 'Payment not completed' }, { status: 400 });
    }

    const subscriptionId = session.subscription as string;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const plan_id = subscription.items.data[0].price.id;

    const { data: planData, error: planError } = await supabase
      .from('subscription_plans')
      .select('images_limit, duration_days')
      .eq('plan_id', plan_id)
      .single();

    if (planError) {
      console.error('Error fetching plan data:', planError);
      return NextResponse.json({ message: 'Failed to fetch plan data' }, { status: 500 });
    }

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + planData.duration_days);

    const { error: subscriptionError } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: userId,
        plan_id: plan_id,
        images_limit: planData.images_limit,
        start_date: new Date().toISOString(),
        end_date: endDate.toISOString(),
        is_active: true
      }, { onConflict: 'user_id' });

    if (subscriptionError) {
      console.error('Error updating user subscription:', subscriptionError);
      return NextResponse.json({ message: 'Failed to update user subscription' }, { status: 500 });
    }

    return NextResponse.redirect(`${request.nextUrl.origin}/success`);
  } catch (err) {
    const error = err as Error;
    console.error('Error in subscription success:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
