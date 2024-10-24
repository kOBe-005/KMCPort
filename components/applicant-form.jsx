import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobSchema } from "@/app/lib/validators";
import { postJob } from "@/actions/jobs";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";

const ApplicantForm = ({ onSubmitForm, initialData = {} }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      responsibilities: initialData.responsibilities || "",
      benefits: initialData.benefits || "",
      Salary: initialData.Salary || 145000,
      isOpen: initialData.isOpen ?? true,
    },
  });

  const { loading, error, fn: fnPostJob } = useFetch(postJob);

  const onSubmit = async (data) => {
    await fnPostJob(data);
    if (error || loading) {
      console.log("Error submitting job:", error);
      return;
    }
    onSubmitForm();
    router.refresh(); // Refresh the page to show updated data
  };

  return (
    <form
      className="px-6 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>

        <Input id="title" {...register("title")} className="mt-1" />

        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>

        <Textarea
          {...register("description")}
          id="description"
          className="mt-1"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="responsibilities"
          className="block text-sm font-medium text-gray-700"
        >
          Job Responsibilities
        </label>

        <Textarea
          {...register("responsibilities")}
          id="responsibilities"
          className="mt-1"
        />
        {errors.responsibilities && (
          <p className="text-red-500 text-xs mt-1">
            {errors.responsibilities.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="benefits"
          className="block text-sm font-medium text-gray-700"
        >
          Job Benefits
        </label>

        <Textarea {...register("benefits")} id="benefits" className="mt-1" />
        {errors.benefits && (
          <p className="text-red-500 text-xs mt-1">{errors.benefits.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="Salary"
          className="block text-sm font-medium text-gray-700"
        >
          Salary
        </label>

        <Input
          id="Salary"
          {...register("Salary", {
            valueAsNumber: true,
          })}
          type="number"
          className="mt-1"
        />

        {errors.Salary && (
          <p className="text-red-500 text-xs mt-1">{errors.Salary.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="isOpen"
          className="block text-sm font-medium text-gray-700"
        >
          Job Availability
        </label>
        <Controller
          name="isOpen"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value === "true")}
              value={field.value ? "true" : "false"}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Open</SelectItem>
                <SelectItem value="false">Close</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Post Job"}
      </Button>
    </form>
  );
};

export default ApplicantForm;
