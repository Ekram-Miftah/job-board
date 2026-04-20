import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { jobSchema } from "@/lib/validations";
import { error } from "console";
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went Wrong " },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "EMPLOYER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const validated = jobSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }
    const job = await prisma.job.create({
      data: {
        ...validated.data,
        employerId: session.user.id,
      },
    });
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went Wrong " },
      { status: 500 }
    );
  }
}
