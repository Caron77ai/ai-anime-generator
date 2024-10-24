import { redirect } from 'next/navigation';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const { session_id } = searchParams;

  if (!session_id) {
    redirect('/');
  }

  // 这里可以添加验证session_id的逻辑

  // 成功后重定向到首页
  redirect('/?subscription=success');
}