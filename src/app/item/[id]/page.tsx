import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ItemDetailClient from '@/components/item/ItemDetailClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

async function getItem(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/items/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getSimilar(category: string, excludeId: string) {
  try {
    const res = await fetch(`${API_URL}/api/items?category=${encodeURIComponent(category)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const all = await res.json();
    return Array.isArray(all) ? all.filter((i: any) => i._id !== excludeId) : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const item = await getItem(params.id);
  if (!item) return { title: 'Item not found' };
  return {
    title: item.name,
    description: item.description ?? `Order ${item.name} — ₹${item.price}`,
    openGraph: { images: item.imageUrl ? [item.imageUrl] : [] },
  };
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  if (!item) notFound();

  const similar = item.category ? await getSimilar(item.category, params.id) : [];

  return <ItemDetailClient item={item} similar={similar} />;
}
