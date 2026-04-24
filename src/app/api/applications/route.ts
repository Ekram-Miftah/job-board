import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "APPLICANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json(
        { error: "Job Id is required" },
        { status: 400 }
      );
    }
    const existingApplication = await prisma.application.findFirst({
      where: {
        applicantId: session.user.id,
        jobId,
      },
    });
    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this job👀" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        applicantId: session.user.id,
        jobId,
      },
    });
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong🤷‍♂️" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "APPLICANT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.application.findMany({
      where: {
        applicantId: session.user.id,
      },
      include: {
        job: {
          include: {
            employer: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong🤷‍♂️" },
      { status: 500 }
    );
  }
}
