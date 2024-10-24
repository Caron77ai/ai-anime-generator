import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 获取用户的图片使用情况
  const { data: imageCountData, error: imageCountError } = await supabase
    .from('user_image_counts')
    .select('free_images_used, paid_images_used')
    .eq('user_id', userId)
    .single();

  if (imageCountError) {
    console.error('Error fetching image counts:', imageCountError);
    return NextResponse.json({ error: 'Failed to fetch image counts' }, { status: 500 });
  }

  // 获取用户的订阅信息
  let subscriptionData = null;
  const { data, error: subscriptionError } = await supabase
    .from('user_subscriptions')
    .select('images_limit, is_active, end_date')
    .eq('user_id', userId)
    .single();

  // 如果没有找到订阅记录，我们假设用户没有活跃的订阅
  if (subscriptionError) {
    if (subscriptionError.code === 'PGRST116') {
      console.log('User has no active subscription');
    } else {
      console.error('Error fetching subscription data:', subscriptionError);
      return NextResponse.json({ error: 'Failed to fetch subscription data' }, { status: 500 });
    }
  } else {
    subscriptionData = data;
  }

  const freeImagesUsed = imageCountData?.free_images_used || 0;
  const paidImagesUsed = imageCountData?.paid_images_used || 0;
  const subscriptionLimit = subscriptionData?.images_limit || 0;
  const isSubscriptionActive = subscriptionData?.is_active && new Date(subscriptionData.end_date) > new Date();

  const remainingFreeGenerations = Math.max(10 - freeImagesUsed, 0);
  const remainingPaidGenerations = isSubscriptionActive ? Math.max(subscriptionLimit - paidImagesUsed, 0) : 0;

  return NextResponse.json({
    remainingFreeGenerations,
    remainingPaidGenerations,
    totalRemainingGenerations: remainingFreeGenerations + remainingPaidGenerations
  });
}
