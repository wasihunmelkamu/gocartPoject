import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../../lib/auth';

export async function POST(req){
  try{
    const { email, password } = await req.json();
    if(!email || !password) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    const token = signToken({ id: user.id, email: user.email });
    const res = new Response(JSON.stringify({ ok: true }));
    // set cookie (HttpOnly)
    res.headers.set('Set-Cookie', `gocart_token=${token}; HttpOnly; Path=/; Max-Age=${60*60*24*7}`);
    return res;
  }catch(err){
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
