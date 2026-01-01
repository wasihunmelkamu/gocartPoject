import { prisma } from "../../../lib/prisma"
import bcrypt from "bcryptjs";
export async function POST(request) {
  const { email, password } = await request.json();
  // Demo: hardcoded credentials
  if (email === "user@example.com" && password === "password123") {
    return Response.json({ success: true });
  }
  return Response.json({ error: "Invalid credentials" }, { status: 401 });
}
