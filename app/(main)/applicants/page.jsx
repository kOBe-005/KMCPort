import { Suspense } from "react";
import { getUserApplicants } from "@/actions/applicants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicantList from "./_components/applicant-list";

export const metadata = {
  title: "Applicants | KMCPort",
  description: "See the list of all the applicants.",
};

export default async function ApplicantsPage() {
  return (
    <Tabs defaultValue="new">
      <TabsList className="mb-4">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="old">Old</TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <Suspense fallback={<div>Loading new applicants...</div>}>
          <NewApplicants />
        </Suspense>
      </TabsContent>
      <TabsContent value="past">
        <Suspense fallback={<div>Loading old applicants...</div>}>
          <OldApplicants />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

async function NewApplicants() {
  const applicants = await getUserApplicants("new");
  return <ApplicantList applicants={applicants} type="upcoming" />;
}

async function OldApplicants() {
  const applicants = await getUserApplicants("old");
  return <ApplicantList applicants={applicants} type="past" />;
}
