"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

<<<<<<< HEAD
const CTAButton = ({ locale }: { locale: any }) => {
  return (
<<<<<<< HEAD
    <Link href="/animegenerator" passHref>
=======
    <Link
      href="https://www.aianimegenerators.com/"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
>>>>>>> dev
      <Button
        variant="default"
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        aria-label="Get Boilerplate"
=======
interface CTAButtonProps {
  locale: {
    title: string;
  };
}

export default function CTAButton({ locale }: CTAButtonProps) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleSignedInClick = () => {
    router.push('/generate-image');
  };

  if (!isLoaded) {
    return null; // 或者显示一个加载指示器
  }

  if (isSignedIn) {
    return (
      <button
        onClick={handleSignedInClick}
        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none"
>>>>>>> dev
      >
        {locale.title}
      </button>
    );
  }

  return (
    <SignInButton mode="modal">
      <button className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none">
        {locale.title}
      </button>
    </SignInButton>
  );
}
