"use client";

import { useUser } from '@clerk/nextjs';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spacer,
} from "@nextui-org/react";
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

import { siteConfig } from "@/config/site";
import { ALL_TIERS, Tier } from "@/config/tiers";
import { FaCheck } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";

// 初始化Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Pricing = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  // 使用类型断言来确保 TypeScript 理解 TIERS 的类型
  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}` as keyof typeof ALL_TIERS] || ALL_TIERS.TIERS_EN;
  const [loading, setLoading] = useState(false);
  const { isSignedIn, user } = useUser();

  const handlePayment = async (plan_id: string) => {
    if (!isSignedIn) {
      alert('Please log in to subscribe');
      return;
    }

    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      console.log('Attempting to create checkout session with plan_id:', plan_id);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const session = await response.json();

      if (!session || !session.sessionId) {
        throw new Error('Invalid session data received from server');
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      alert(`An error occurred during the payment process: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-6xl items-center pt-16"
    >
      <div className="flex flex-col text-center max-w-xl">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <h3 className="text-4xl font-medium tracking-tight">{locale.title2}</h3>
        <Spacer y={4} />
        <p className="text-large text-default-500">{locale.description}</p>
      </div>
      <Spacer y={8} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {TIERS.map((tier: Tier) => (
          <Card key={tier.key} className="p-3 flex-1 w-full max-w-sm" shadow="md">
            <CardHeader className="flex flex-col items-start gap-2 pb-6">
              <h2 className="text-large font-medium">{tier.title}</h2>
              <p className="text-medium text-default-500">{tier.description}</p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-8">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-2xl font-semibold leading-7 tracking-tight text-transparent">
                  {tier.price}
                </span>
                {typeof tier.price !== "string" ? (
                  <span className="text-small font-medium text-default-400">
                    {tier.price}
                  </span>
                ) : null}
              </p>
              <ul className="flex flex-col gap-2">
                {tier.features?.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-2">
                    <FaCheck className="text-blue-500" />
                    <p className="text-default-500">{feature}</p>
                  </li>
                ))}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                color={tier.buttonColor}
                variant={tier.buttonVariant}
                onPress={() => handlePayment(tier.plan_id)}
                disabled={loading}
              >
                {loading ? 'Processing...' : tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Spacer y={12} />
      <div className="flex py-2">
        <p className="text-default-400 text-center">
          {locale.doYouLike}&nbsp;
          <Link
            color="foreground"
            href={siteConfig.authors[0].twitter}
            underline="always"
            rel="noopener noreferrer nofollow"
          >
            {locale.follow}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
