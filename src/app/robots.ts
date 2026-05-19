import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Robots {
  const domain = headers().get('x-tenant-domain') ?? 'localhost';
  const protocol = domain.startsWith('localhost') ? 'http' : 'https';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/super-admin/', '/api/'],
      },
    ],
    sitemap: `${protocol}://${domain}/sitemap.xml`,
  };
}
