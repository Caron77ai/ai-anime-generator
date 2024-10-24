import { getSubscriptionInfo } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function BillingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const subscriptionInfo = await getSubscriptionInfo(userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Billing Information</h1>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Billing Overview</h2>
          {subscriptionInfo && subscriptionInfo.planName ? (
            <>
              <p className="mb-2">Current Plan: <span className="font-semibold">{subscriptionInfo.planName}</span></p>
              <p className="mb-2">Status: <span className="font-semibold">{subscriptionInfo.status}</span></p>
              <p className="mb-2">Next Billing Date: <span className="font-semibold">{subscriptionInfo.nextBillingDate}</span></p>
              <div className="mt-4">
                <Link href="/#Pricing" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Upgrade Plan
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4">You don&apos;t have any active subscriptions.</p>
              <Link href="/#Pricing" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                Choose a Plan
              </Link>
            </>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          {subscriptionInfo && subscriptionInfo.recentTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Plan</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Period</th>
                    <th className="px-4 py-2 text-left">Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionInfo.recentTransactions.map(transaction => (
                    <tr key={transaction.id} className="border-b">
                      <td className="px-4 py-2">{transaction.date}</td>
                      <td className="px-4 py-2">{transaction.planName}</td>
                      <td className="px-4 py-2">{transaction.currency.toUpperCase()} {transaction.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded ${transaction.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{transaction.periodStart} - {transaction.periodEnd}</td>
                      <td className="px-4 py-2">{transaction.paymentMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No transaction records available</p>
          )}
        </div>
      </div>
    </div>
  );
}
