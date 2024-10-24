import { notFound } from "next/navigation";
import { getUserByUsername } from "@/actions/users";
import JobCard from "@/components/job-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function generateMetadata({ params }) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name}'s Profile | Your App Name`,
    description: `Apply a job and get assisted by ${user.name}. View open positions.`,
  };
}

export default async function UserProfilePage({ params }) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600 text-center">
          Welcome, this HR Kobe. Check all the open positions and I'll help you
          landing your dream job.
        </p>
      </div>

      {user.jobs.length === 0 ? (
        <p className="text-center text-gray-600">No open jobs available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {user.jobs.map((job) => (
            <JobCard key={job.id} job={job} username={params.username} isOpen />
          ))}
        </div>
      )}
    </div>
  );
}
