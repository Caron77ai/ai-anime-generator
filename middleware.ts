<<<<<<< HEAD
<<<<<<< HEAD
import { NextRequest } from "next/server";
import { defaultLocale, locales } from "./lib/i18n";

const SUPPORTED_PAGES = ['', 'animegenerator']; // 支持多语言的页面路径

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 移除开头的斜杠并分割路径
  const segments = pathname.replace(/^\//, '').split('/');
  const firstSegment = segments[0];

  // 检查是否是支持的语言
  const isLocale = locales.includes(firstSegment);

  // 检查是否是支持多语言的页面
  const isSupportedPage = SUPPORTED_PAGES.includes(segments[isLocale ? 1 : 0] || '');

  if (isSupportedPage) {
    // 如果是支持的页面但没有语言前缀，重定向到默认语言
    if (!isLocale) {
      request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
      return Response.redirect(request.nextUrl);
    }
    // 如果已经有正确的语言前缀，不做任何处理
    return;
  }

  // 对于不支持多语言的页面，不做任何处理
  return;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2|ttf|eot)).*)'
  ]
};
=======
import { authMiddleware } from "@clerk/nextjs/server";
=======
import { clerkMiddleware } from '@clerk/nextjs/server'
>>>>>>> dev

export default clerkMiddleware()

export const config = {
<<<<<<< HEAD
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
>>>>>>> dev
=======
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
>>>>>>> dev
