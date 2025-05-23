import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

// 创建 Replicate 客户端实例
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export const maxDuration = 60;

interface RequestBody {
  description: string;
}

export async function POST(request: NextRequest) {
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
      .maybeSingle();

    // 如果用户不存在，尝试在users表中创建用户记录
    if (!userData) {
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
    }

    // 获取用户的图片使用情况
    const { data: imageCountData, error: imageCountError } = await supabase
      .from('user_image_counts')
      .select('free_images_used, paid_images_used')
      .eq('user_id', userId)
      .maybeSingle();

    // 如果没有找到记录，先创建一个初始记录
    let freeImagesUsed = 0;
    let paidImagesUsed = 0;

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
    } else if (imageCountError) {
      console.error('Error fetching image counts:', imageCountError);
      return NextResponse.json({ error: 'Failed to fetch image counts' }, { status: 500 });
    } else if (imageCountData) {
      freeImagesUsed = imageCountData.free_images_used || 0;
      paidImagesUsed = imageCountData.paid_images_used || 0;
    }

    // 获取用户的订阅信息
    let subscriptionData = null;
    const { data, error: subscriptionError } = await supabase
      .from('user_subscriptions')
      .select('images_limit, is_active, end_date')
      .eq('user_id', userId)
      .maybeSingle();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      console.error('Error fetching subscription data:', subscriptionError);
      return NextResponse.json({ error: 'Failed to fetch subscription data' }, { status: 500 });
    } else if (data) {
      subscriptionData = data;
    }

    const subscriptionLimit = subscriptionData?.images_limit || 0;
    const isSubscriptionActive = subscriptionData?.is_active && new Date(subscriptionData.end_date) > new Date();

    let canGenerate = false;
    let isPaid = false;

    if (isSubscriptionActive && paidImagesUsed < subscriptionLimit) {
      canGenerate = true;
      isPaid = true;
    } else if (freeImagesUsed < 5) {
      canGenerate = true;
    }

    if (!canGenerate) {
      return NextResponse.json({ error: 'You have reached the image generation limit. Please purchase a subscription.' }, { status: 403 });
    }

    const { description } = await request.json() as RequestBody;

    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'Invalid description' }, { status: 400 });
    }

    // 调用 Replicate API
    const response = await replicate.run(
      "konieshadow/fooocus-api-anime:a750658f54c4f8bec1c8b0e352ce2666c22f2f919d391688ff4fc16e48b3a28f",
      {
        input: {
          prompt: description,
          cn_type1: "ImagePrompt",
          cn_type2: "ImagePrompt",
          cn_type3: "ImagePrompt",
          cn_type4: "ImagePrompt",
          sharpness: 2,
          image_seed: -1,
          uov_method: "Disabled",
          image_number: 1,
          guidance_scale: 7,
          refiner_switch: 0.66,
          negative_prompt: "(embedding:unaestheticXLv31:0.8), low quality, watermark",
          style_selections: "Fooocus V2,Fooocus Masterpiece,SAI Anime,SAI Digital Art,SAI Enhance,SAI Fantasy Art",
          uov_upscale_value: 0,
          outpaint_selections: "",
          outpaint_distance_top: 0,
          performance_selection: "Speed",
          outpaint_distance_left: 0,
          aspect_ratios_selection: "1152*896",
          outpaint_distance_right: 0,
          outpaint_distance_bottom: 0,
          inpaint_additional_prompt: ""
        }
      }
    );

    if (Array.isArray(response) && response.length > 0 && typeof response[0] === 'string') {
      // 更新用户的图片使用计数
      const { error: updateError } = await supabase
        .from('user_image_counts')
        .upsert({
          user_id: userId,
          [isPaid ? 'paid_images_used' : 'free_images_used']: isPaid ? paidImagesUsed + 1 : freeImagesUsed + 1,
          last_updated: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (updateError) {
        console.error('Error updating image count:', updateError);
        return NextResponse.json({ error: 'Failed to update image count' }, { status: 500 });
      }

      // 记录生成的图片到 generations 表
      const { error: generationError } = await supabase
        .from('generations')
        .insert({
          user_id: userId,
          prompt: description,
          image_url: response[0]
        });

      if (generationError) {
        console.error('Error recording generation:', generationError);
        return NextResponse.json({ error: 'Failed to record generation' }, { status: 500 });
      }

      return NextResponse.json({ imageUrl: response[0] }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Image URL not found in API response.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
