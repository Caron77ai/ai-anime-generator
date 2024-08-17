import { ONE_DAY } from "@/lib/constants";
import { getUserSubscriptionStatus } from "@/lib/lemonsqueezy/subscriptionFromStorage";
import supabase from "@/lib/supabaseClient"; // 导入 Supabase 客户端
import { Role, UserInfo } from "@/types/user";
import { Account, NextAuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import redis from "./redis";

// 定义包含 accessToken 的扩展 token 对象类型
interface ExtendedToken extends TokenSet {
  accessToken?: string;
  userId?: string;
}

// 定义 SupabaseUser 类型
export interface SupabaseUser extends UserInfo {
  userId: string;
  username: string;
  avatar: string;
  email: string;
  platform: string;
  role: Role; // 使用 Role 类型
  membershipExpire?: number;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: '/auth/logout',
  },
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 50000,
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;

        // 存储访问令牌
        await storeAccessToken(account.access_token || '', token.sub);

        // 用户信息存入数据库
        const userInfo = await upsertUserAndGetInfo(token, account);
        if (!userInfo || !userInfo.userId) {
          throw new Error('无法保存或检索用户信息。');
        }

        const planRes = await getUserSubscriptionStatus({ userId: userInfo.userId, defaultUser: userInfo });
        const fullUserInfo = {
          userId: userInfo.userId,
          username: userInfo.username,
          avatar: userInfo.avatar,
          email: userInfo.email,
          platform: userInfo.platform,
          role: planRes.role,
          membershipExpire: planRes.membershipExpire,
          accessToken: account.access_token,
        };
        return fullUserInfo;
      }
      return token as any;
    },
    async session({ session, token }) {
      if (token && token.userId) {
        session.user = await getSessionUser(token);
      }
      return session;
    },
  },
};

async function storeAccessToken(accessToken: string, sub?: string) {
  if (!accessToken || !sub) return;
  const expire = ONE_DAY * 30; // 30天的秒数
  await redis.set(accessToken, sub, { ex: expire });
}

async function upsertUserAndGetInfo(token: JWT, account: Account) {
  const user = await upsertUser(token, account.provider);
  if (!user || !user.userId) return null;

  const subscriptionStatus = await getUserSubscriptionStatus({ userId: user.userId, defaultUser: user });

  return {
    ...user,
    role: subscriptionStatus.role,
    membershipExpire: subscriptionStatus.membershipExpire,
  };
}

// 修改 upsertUser 函数
async function upsertUser(token: JWT, provider: string): Promise<SupabaseUser | null> {
  const userData: SupabaseUser = {
    id: token.sub as string,
    userId: token.sub as string,
    aud: 'your_audience_claim', // 填写适当的 Audience claim
    role: 0 as Role, // 设置默认角色
    email: token.email as string,
    email_confirmed_at: undefined, // 默认值
    phone: undefined, // 默认值
    phone_confirmed_at: undefined, // 默认值
    confirmed_at: undefined, // 默认值
    last_sign_in_at: undefined, // 默认值
    app_metadata: {}, // 默认值
    user_metadata: {}, // 默认值
    identities: [], // 默认值
    created_at: new Date().toISOString(), // 默认值
    updated_at: new Date().toISOString(), // 默认值
    is_anonymous: false, // 默认值
    username: token.name as string,
    avatar: token.picture as string,
    platform: provider,
    membershipExpire: undefined, // 默认值
  };

  const { data: user, error } = await supabase
    .from('users')
    .upsert(userData, { onConflict: 'id' })
    .single();

  if (error) {
    console.error('插入或更新用户时出错:', error);
    return null;
  }

  return user;
}


async function getSessionUser(token: ExtendedToken): Promise<UserInfo> {
  const planRes = await getUserSubscriptionStatus({ userId: token.userId as string });
  return {
    userId: token.userId,
    username: token.username,
    avatar: token.avatar,
    email: token.email,
    platform: token.platform,
    role: planRes.role,
    membershipExpire: planRes.membershipExpire,
    accessToken: token.accessToken,
  } as UserInfo;
}
