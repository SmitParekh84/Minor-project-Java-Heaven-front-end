import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { getTenantByDomain } from '@/lib/tenant';
import MenuClient from '@/components/menu/MenuClient';

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get('x-tenant-domain') ?? 'localhost';
  const tenant = await getTenantByDomain(domain);
  return {
    title: `Menu — ${tenant.brandName}`,
    description: `Browse the full menu at ${tenant.brandName}. Coffees, teas, pastries and more.`,
  };
}

export default async function MenuPage() {
  const domain = headers().get('x-tenant-domain') ?? 'localhost';
  const tenant = await getTenantByDomain(domain);
  return <MenuClient tenant={tenant} />;
}
