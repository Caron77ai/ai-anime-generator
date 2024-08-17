// pages/_app.tsx
import { NextAuthProvider } from "@/components/NextAuthProvider"; // 根据实际路径调整
import { AppProps } from "next/app";
import '../styles/globals.css'; // 导入全局样式（如果有）

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
export default MyApp;
