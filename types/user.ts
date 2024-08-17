import { User as SupabaseUserType, UserIdentity } from "@supabase/supabase-js"; // 导入 Supabase 提供的 User 类型

// 定义角色类型
export type Role = 0 | 2; // 0: Standard User; 2: Member User

export type RedisUserId = string | null;

export interface UserId {
  userId: string;
}

export interface RemainingParams {
  userId: string;
  role?: Role;
}



// 从 Supabase 的用户类型扩展 UserInfo 接口
export interface UserInfo extends Omit<SupabaseUserType, 'role'> {
  userId: string;
  username: string;
  avatar?: string;
  platform: string;
  role: Role; // 确保 role 是我们定义的 Role 类型
  membershipExpire?: number;
  accessToken?: string;
  subscriptionId?: string; // 可能在 Supabase 中未定义的字段
  currentPeriodEnd?: number; // 可能在 Supabase 中未定义的字段
  customerId?: string; // 可能在 Supabase 中未定义的字段
  variantId?: string; // 可能在 Supabase 中未定义的字段
}

// 如果你需要扩展用户数据，你可以将 Supabase 的 User 进行扩展
export interface SupabaseUser extends Omit<SupabaseUserType, 'role'> {
  id: string; // 用户的唯一标识符
  aud: string; // Audience claim
  role: Role; // 使用自定义 Role 类型
  email: string; // 用户的邮箱地址
  email_confirmed_at: string | undefined; // 邮箱确认时间
  phone: string | undefined; // 用户的电话号码
  phone_confirmed_at: string | undefined; // 电话确认时间
  confirmed_at: string | undefined; // 用户确认时间
  last_sign_in_at: string | undefined; // 最后登录时间
  app_metadata: object; // 应用元数据
  user_metadata: object; // 用户元数据
  identities: UserIdentity[]; // 关联的身份数组
  created_at: string; // 用户创建时间
  updated_at: string; // 用户更新时间
  is_anonymous: boolean; // 是否为匿名用户
  username: string; // 用户名
  avatar: string; // 用户头像
  membershipExpire?: number;
  platform: string;
}
