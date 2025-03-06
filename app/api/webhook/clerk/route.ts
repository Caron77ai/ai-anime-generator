import { supabase } from '@/lib/supabaseClient';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

export const runtime = 'edge';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('请在 .env 或 .env.local 文件中添加 CLERK_WEBHOOK_SECRET');
  }

  // 获取头部信息
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // 如果没有头部信息，返回错误
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('错误：缺少 svix 头部信息', { status: 400 });
  }

  // 获取请求体
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // 创建一个新的 Svix 实例
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // 验证 payload
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('验证 webhook 时出错:', err);
    return new Response('发生错误', { status: 400 });
  }

  // 处理事件
  switch (evt.type) {
    case 'user.created': {
      const { id, email_addresses, ...attributes } = evt.data;
      const userEmail = email_addresses[0]?.email_address;

      if (id && userEmail) {
        const { data, error } = await supabase
          .from('users')
          .insert([
            {
              id: id,
              email: userEmail,
              username: userEmail, // 使用 email 作为初始 username
            }
          ]);

        if (error) {
          console.error('Error inserting user:', error);
          return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
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
          console.error('Error initializing user image count:', countError);
          return NextResponse.json({ error: 'Failed to initialize user image count' }, { status: 500 });
        }
      }
      break;
    }
    case 'user.updated': {
      const { id, email_addresses, username, first_name, last_name } = evt.data;

      if (email_addresses && Array.isArray(email_addresses)) {
        const userEmail = email_addresses[0]?.email_address;
        const { error } = await supabase
          .from('users')
          .update({
            email: userEmail || '',
            username: username || userEmail, // 如果没有 username，则使用 email
            firstname: first_name || '',
            lastname: last_name || '',
          })
          .eq('id', id);

        if (error) {
          console.error(`更新用户信息时出错: ${id}`, error);
          return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
        }

        console.log(`用户信息已更新: ${id}, 邮箱: ${userEmail}`);
      } else {
        console.error(`用户缺少邮箱地址: ${id}`);
      }
      break;
    }
    case 'session.created': {
      // 对于 session.created 事件，我们可能不需要做任何特殊处理
      console.log(`新会话已创建: ${evt.data.user_id}`);
      break;
    }
  }

  return NextResponse.json({ message: 'Webhook received' });
}
