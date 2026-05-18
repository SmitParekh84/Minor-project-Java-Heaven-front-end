import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import TenantModel from '@/models/Tenant';

function authorized(request: NextRequest) {
  const session = request.cookies.get('super-admin-session');
  return session?.value === process.env.SUPER_ADMIN_PASSWORD;
}

type Params = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Params) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const tenant = await TenantModel.findById(params.id).lean();
  if (!tenant) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(tenant);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  await connectDB();
  const tenant = await TenantModel.findByIdAndUpdate(params.id, { $set: body }, { new: true, runValidators: true }).lean();
  if (!tenant) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(tenant);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  await TenantModel.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
