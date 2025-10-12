 'use server'

import { prisma }  from "@/lib/prisma"

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      name: "Wasihun Melkamu",
      email: "wasihun@example.com",
      image: "profile.png",
    },
  })

  console.log("New user created:", newUser)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
