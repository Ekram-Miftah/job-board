import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },

        { status: 400 }
      );
    }
    const { name, email, password, role } = validated.data;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email Alredy Exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    return NextResponse.json(
      { message: "User created Successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went Wrong" },
      { status: 500 }
    );
  }
}
