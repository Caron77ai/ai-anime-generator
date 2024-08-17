/**
 * 从数据库中检索用户的角色和会员过期日期。
 */
import { MEMBERSHIP_ROLE_VALUE } from "@/lib/constants";
import supabase from "@/lib/supabaseClient"; // 从 Supabase 客户端中导入
import { SubScriptionInfo } from "@/types/subscribe";
import { Role, UserInfo } from "@/types/user";

export async function getUserSubscriptionStatus({ userId, defaultUser }: { userId: string; defaultUser?: UserInfo }) {
  let user: UserInfo | null = null;

  if (defaultUser) {
    // 如果提供了默认用户，则使用默认用户
    user = defaultUser;
  } else {
    // 从数据库中查询用户信息
    const { data: dbUser, error } = await supabase
      .from('users') // 替换为你在 Supabase 中使用的表名
      .select(`
        userId,
        username,
        avatar,
        platform,
        role,
        membershipExpire,
        accessToken,
        subscriptionId,
        currentPeriodEnd,
        customerId,
        variantId
      `)
      .eq('userId', userId)
      .single(); // 查询单个用户

    if (error || !dbUser) throw new Error("用户未找到");

    // 将查询结果映射到 UserInfo 接口
    user = {
      ...dbUser,
      role: dbUser.role as Role, // 确保角色字段正确转换为 Role 类型
    } as UserInfo;
  }

  if (!user) throw new Error("用户未找到");

  // 计算会员过期时间（13位时间戳或非会员）
  const membershipExpire = (user.currentPeriodEnd || 0) * 1000;
  const isMembership = user.variantId && membershipExpire > Date.now();

  // 将 variantId 转换为数字（如果是字符串）
  const variantId = user.variantId ? Number(user.variantId) : 0;

  // 返回用户订阅信息
  return {
    subscriptionId: user.subscriptionId ?? '', // 处理可能的 undefined 值
    membershipExpire: isMembership ? membershipExpire : 0,
    customerId: user.customerId ?? '', // 处理可能的 undefined 值
    variantId, // 确保 variantId 为数字
    role: isMembership ? MEMBERSHIP_ROLE_VALUE : 0, // 根据逻辑调整角色
  } as SubScriptionInfo;
}
