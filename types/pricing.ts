import type { ButtonProps } from "@nextui-org/react";

export enum FrequencyEnum {
  Yearly = "yearly",
  Quarterly = "quarterly",
}

// 移除这里的 TiersEnum 定义
// export enum TiersEnum {
//   Free = "free",
//   Pro = "pro",
//   Team = "team",
//   Customize = "customize"
// }

export type Frequency = {
  key: FrequencyEnum;
  label: string;
  priceSuffix: string;
};

export interface Tier {
  key: string; // 将 TiersEnum 改为 string
  title: string;
  price: string;
  priceSuffix?: string;
  href: string;
  description?: string;
  mostPopular?: boolean;
  featured?: boolean;
  features?: string[];
  buttonText: string;
  buttonColor?: ButtonProps["color"];
  buttonVariant: ButtonProps["variant"];
  priceId: string;
}

// 添加 SubscriptionPlan 接口
export interface SubscriptionPlan {
  plan_id: string;
  name: string;
  price: number;
  duration_days: number;
  images_limit: number;
}

// 添加 UserSubscription 接口
export interface UserSubscription {
  status: string;
  plan: SubscriptionPlan;
}
