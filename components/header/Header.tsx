"use client";
import HeaderLinks from "@/components/header/HeaderLinks";
import { LangSwitcher } from "@/components/header/LangSwitcher";
import { siteConfig } from "@/config/site";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { ThemedButton } from "../ThemedButton";

const links = [
  { label: "Features", href: "#Features" },
  { label: "Pricing", href: "#Pricing" },
  { label: "Wall of Love", href: "#WallOfLove" },
  { label: "FAQ", href: "#FAQ" },
];

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const syncUserInfo = async () => {
      if (isSignedIn && user) {
        try {
          const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
            }),
          });

          if (!response.ok) {
            console.error("同步用户信息失败");
          }
        } catch (error) {
          console.error("同步用户信息时出错:", error);
        }
      }
    };

    syncUserInfo();
  }, [isSignedIn, user]);

  return (
    <header className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="relative z-50 flex justify-between">
        <div className="flex items-center md:gap-x-12">
          <Link
            href="/"
            aria-label="AI Anime Generator"
            title="AI Anime Generator"
            className="flex items-center space-x-1 font-bold"
          >
            <Image
              alt={siteConfig.name}
              src="/logo.svg"
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="text-gray-950 dark:text-gray-300 hidden md:block">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-label={link.label}
                title={link.label}
                className="tracking-wide transition-colors duration-200 font-norma"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-x-6">
          <HeaderLinks />
          <ThemedButton />
          <LangSwitcher />
          {mounted && (
            <>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/billing" className="text-gray-600 hover:text-gray-900">
                  Billing
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-50">
              <div className="p-5 bg-background border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href="/"
                      aria-label="Landing Page Boilerplate"
                      title="Landing Page Boilerplate"
                      className="inline-flex items-center"
                    >
                      <Image
                        alt={siteConfig.name}
                        src="/logo.svg"
                        className="w-8 h-8"
                        width={32}
                        height={32}
                      />
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-950 dark:text-gray-300">
                        {siteConfig.name}
                      </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="tracking-wide transition-colors duration-200 font-norma"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CgClose />
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          aria-label={link.label}
                          title={link.label}
                          className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {mounted && (
                      <>
                        <li>
                          <Link
                            href="/billing"
                            className="font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Billing
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
                <div className="pt-4">
                  <div className="flex items-center gap-x-5 justify-between">
                    <HeaderLinks />
                    <div className="flex items-center justify-end gap-x-5">
                      <ThemedButton />
                      <LangSwitcher />
                      {mounted && (
                        <>
                          <SignedOut>
                            <SignInButton mode="modal">
                              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Login
                              </button>
                            </SignInButton>
                          </SignedOut>
                          <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                          </SignedIn>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {children}
    </header>
  );
};

export default Header;
