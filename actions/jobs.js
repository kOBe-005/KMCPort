"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { jobSchema } from "@/app/lib/validators";
import exp from "constants";

export async function postJob(data) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const validatedData = jobSchema.parse(data);
    //console.log("Parsed job:", validatedData);
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const job = await db.job.create({
      data: {
        ...validatedData,
        userId: user.id,
      },
    });

    return job;
  } catch (error) {
    console.error("Error posting job:", error);
    throw new Error("Failed to post job");
  }
}

export async function getUserJobs(data) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const jobs = await db.job.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { applicants: true },
      },
    },
  });

  return { jobs, username: user.username };
}

export async function deleteJob(jobId) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const job = await db.job.findUnique({
    where: { id: jobId },
  });

  if (!job || job.userId !== user.id) {
    throw new Error("Job not found or unauthorized");
  }

  await db.job.delete({
    where: { id: jobId },
  });

  return { success: true };
}

export async function getJobDetails(username, jobId) {
  console.log("Fetching job details for:", username, jobId);
  const job = await db.job.findFirst({
    where: {
      id: jobId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  return job;
}
