import { Suspense } from "react";
import { getUserJobs } from "@/actions/jobs";
import JobCard from "@/components/job-card";

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <Jobs />
    </Suspense>
  );
}

async function Jobs() {
  const { jobs, username } = await getUserJobs();

  if (jobs.length === 0) {
    return <p>You haven&apos;t posted any jobs yet.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {jobs?.map((job) => (
        <JobCard key={job.id} job={job} username={username} />
      ))}
    </div>
  );
}
