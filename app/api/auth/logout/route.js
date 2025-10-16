export async function POST(){
  const res = new Response(JSON.stringify({ ok: true }));
  res.headers.set('Set-Cookie', `gocart_token=; HttpOnly; Path=/; Max-Age=0`);
  return res;
}
