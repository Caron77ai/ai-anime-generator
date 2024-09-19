import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // 可选：配置需要公开访问的路由
  publicRoutes: ["/", "/api/(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
