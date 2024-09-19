"use client";
import HeaderLinks from "@/components/header/HeaderLinks";
import { LangSwitcher } from "@/components/header/LangSwitcher";
import { siteConfig } from "@/config/site";
<<<<<<< HEAD
import { getCurrentUser } from "@/lib/session";
=======
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
>>>>>>> dev
import { MenuIcon } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { ThemedButton } from "../ThemedButton";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const links = [
  {
    label: "Features",
    href: "#Features",
  },
  {
    label: "Pricing",
    href: "#Pricing",
  },
  {
    label: "Wall of Love",
    href: "#WallOfLove",
  },
  {
    label: "FAQ",
    href: "#FAQ",
  },
];

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData ?? null); // 使用 ?? 操作符确保 undefined 被处理为 null
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSignIn = () => {
    signIn(); // 调用 signIn 进行登录
  };

  const handleSignOut = () => {
    signOut(); // 调用 signOut 进行登出
  };

  return (
    <header className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="relative z-50 flex justify-between">
        <div className="flex items-center md:gap-x-12">
          <Link
            href="/"
            aria-label="Landing Page Boilerplate"
            title="Landing Page Boilerplate"
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
<<<<<<< HEAD
          {user ? (
            <button onClick={handleSignOut} className="btn-signout">Logout</button>
          ) : (
            <button onClick={handleSignIn} className="btn-signin">Login</button>
          )}
=======
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
>>>>>>> dev
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
                  </ul>
                </nav>
                <div className="pt-4">
                  <div className="flex items-center gap-x-5 justify-between">
                    <HeaderLinks />
                    <div className="flex items-center justify-end gap-x-5">
                      <ThemedButton />
                      <LangSwitcher />
<<<<<<< HEAD
                      {user ? (
                        <button onClick={handleSignOut} className="btn-signout">Logout</button>
                      ) : (
                        <button onClick={handleSignIn} className="btn-signin">Login</button>
                      )}
=======
                      <SignedOut>
                        <SignInButton mode="modal">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Sign In
                          </button>
                        </SignInButton>
                      </SignedOut>
                      <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                      </SignedIn>
>>>>>>> dev
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
