// app/[username]/[jobId]/page.jsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getJobDetails } from "@/actions/jobs";
import JobDetails from "./_components/job-details";
import BookingForm from "./_components/booking-form";

export async function generateMetadata({ params }) {
  const job = await getJobDetails(params.username, params.jobId);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `Apply ${job.title} with ${job.user.name} | KMCPort`,
    description: `Simplify job process with ${job.user.name}.`,
  };
}

export default async function JobBookingPage({ params }) {
  const job = await getJobDetails(params.username, params.jobId);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
      <JobDetails job={job} />
      <Suspense fallback={<div>Loading job application form...</div>}>
        <BookingForm job={job} />
      </Suspense>
    </div>
  );
}
