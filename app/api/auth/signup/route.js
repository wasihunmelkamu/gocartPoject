import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return new Response(JSON.stringify({ error: "User exists" }), {
        status: 409,
      });
    }
    const hash = await bcrypt.hash(password, 10);
    // Prisma will auto-generate the id if your schema uses @default(uuid())
    const user = await prisma.user.create({
      data: { name: name || "", email, password: hash, image: "" },
    });
    return new Response(
      JSON.stringify({ ok: true, user: { id: user.id, email: user.email } })
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
