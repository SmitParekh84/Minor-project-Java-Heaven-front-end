import { headers } from 'next/headers';
import { getTenantByDomain } from '@/lib/tenant';
import HeroClient from '@/components/hero/HeroClient';

export default async function HomePage() {
  const domain = headers().get('x-tenant-domain') ?? 'localhost';
  const tenant = await getTenantByDomain(domain);
  return <HeroClient tenant={tenant} />;
}
