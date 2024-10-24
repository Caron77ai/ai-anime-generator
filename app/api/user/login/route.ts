import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { id, email, username, firstName, lastName } = await req.json();

  if (!id || !email) {
    return NextResponse.json({ error: '缺少必要的用户信息' }, { status: 400 });
  }

  // 检查用户是否存在
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select()
    .eq('id', id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('获取用户信息时出错:', fetchError);
    return NextResponse.json({ error: '获取用户信息失败' }, { status: 500 });
  }

  const userData = {
    email,
    username: username || email, // 使用 email 作为初始 username
    firstname: firstName || '',
    lastname: lastName || '',
  };

  if (existingUser) {
    // 更新现有用户信息
    const { error: updateError } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id);

    if (updateError) {
      console.error('更新用户信息时出错:', updateError);
      return NextResponse.json({ error: '更新用户信息失败' }, { status: 500 });
    }
  } else {
    // 插入新用户
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id, ...userData }]);

    if (insertError) {
      console.error('插入新用户时出错:', insertError);
      return NextResponse.json({ error: '创建用户失败' }, { status: 500 });
    }

    // 初始化用户图片计数
    const { error: countError } = await supabase
      .from('user_image_counts')
      .insert([
        {
          user_id: id,
          free_images_used: 0,
          paid_images_used: 0
        }
      ]);

    if (countError) {
      console.error('初始化用户图片计数时出错:', countError);
      return NextResponse.json({ error: '初始化用户图片计数失败' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: '用户信息已更新' });
}
