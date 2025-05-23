import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 首先检查用户是否存在于users表中
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    // 如果用户不存在，尝试在users表中创建用户记录
    if (userError) {
      if (userError.code === 'PGRST116') { // 没有找到记录
        // 从Clerk获取用户信息
        const clerkUser = auth().userId;

        // 这里简单创建一个基础用户记录，实际应用中可能需要更多信息
        const { error: insertUserError } = await supabase
          .from('users')
          .insert({
            id: userId,
            email: `user_${userId}@example.com`, // 临时邮箱，实际应用需要真实邮箱
            username: `user_${userId}` // 临时用户名
          });

        if (insertUserError) {
          console.error('Error creating user:', insertUserError);
          return NextResponse.json({ error: 'Failed to create user record' }, { status: 500 });
        }
      } else {
        console.error('Error fetching user:', userError);
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
      }
    }

    // 获取用户的图片使用情况，使用maybeSingle()而不是single()，以避免记录不存在时出错
    const { data: imageCountData, error: imageCountError } = await supabase
      .from('user_image_counts')
      .select('free_images_used, paid_images_used')
      .eq('user_id', userId)
      .maybeSingle();

    // 如果没有找到记录，先创建一个初始记录
    if (!imageCountData && !imageCountError) {
      const { error: insertError } = await supabase
        .from('user_image_counts')
        .insert({
          user_id: userId,
          free_images_used: 0,
          paid_images_used: 0
        });

      if (insertError) {
        console.error('Error creating image count record:', insertError);
        return NextResponse.json({ error: 'Failed to initialize image count record' }, { status: 500 });
      }

      // 创建记录后返回初始值
      return NextResponse.json({
        remainingFreeGenerations: 5,
        remainingPaidGenerations: 0,
        totalRemainingGenerations: 5
      });
    }

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
      .maybeSingle();

    // 如果没有找到订阅记录，我们假设用户没有活跃的订阅
    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      console.error('Error fetching subscription data:', subscriptionError);
      return NextResponse.json({ error: 'Failed to fetch subscription data' }, { status: 500 });
    } else if (data) {
      subscriptionData = data;
    }

    const freeImagesUsed = imageCountData?.free_images_used || 0;
    const paidImagesUsed = imageCountData?.paid_images_used || 0;
    const subscriptionLimit = subscriptionData?.images_limit || 0;
    const isSubscriptionActive = subscriptionData?.is_active && new Date(subscriptionData.end_date) > new Date();

    const remainingFreeGenerations = Math.max(5 - freeImagesUsed, 0);
    const remainingPaidGenerations = isSubscriptionActive ? Math.max(subscriptionLimit - paidImagesUsed, 0) : 0;

    return NextResponse.json({
      remainingFreeGenerations,
      remainingPaidGenerations,
      totalRemainingGenerations: remainingFreeGenerations + remainingPaidGenerations
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
