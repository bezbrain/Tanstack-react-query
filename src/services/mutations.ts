// DATA MUTATION CONFIGURATION HERE
// DATA MUTATION CONFIGURATION HERE

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob, deleteJob, getJobsId } from "./api";
import { Dispatch, SetStateAction } from "react";

export function useCreateJob() {
  const queryClient = useQueryClient(); // Get access to the query client
  return useMutation({
    mutationFn: (data: Object) => createJob(data),
    // You can intercept the resource creation whether before creation, during creation or after creation.

    // The function below will run before the resource is created
    onMutate: () => {
      console.log("Mutate");
    },
    // This function will run if our mutation gets an error
    onError: () => {
      console.log("Error");
    },
    // This function will run if our mutation gets a success
    onSuccess: () => {
      // Invalidate the query to refetch the jobs list
      queryClient.invalidateQueries({ queryKey: ["jobs"] }); // Get all jobs when successful
    },
    // This function will run after the resource has been created whether success or error
    onSettled: () => {
      console.log("Settled");
    },
  });
}

export function useDeleteJob(setState: Dispatch<SetStateAction<string>>) {
  const queryClient = useQueryClient(); // Get access to the query client
  return useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      console.log("Running");
      // Invalidate the query to refetch the jobs list
      queryClient.invalidateQueries({ queryKey: ["jobs"] }); // Get all jobs when successful
    },
    onSettled: () => {
      setState("");
    },
  });
}
