import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";

import { NextResponse } from "next/server";
import { includes } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "EMPLOYER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { status } = await req.json();

    if (!["ACCEPTED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json({ error: "Invalid Status!👀" }, { status: 401 });
    }

    const application = await prisma.application.findUnique({
      where: { id: params.id },
      include: { job: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (application.job.employerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.application.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrond" },
      { status: 500 }
    );
  }
}
