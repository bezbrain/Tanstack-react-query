// DATA MUTATION CONFIGURATION HERE
// DATA MUTATION CONFIGURATION HERE

import { useMutation } from "@tanstack/react-query";
import { createJob } from "./api";

export function useCreateJob() {
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
      console.log("Success");
    },
    // This function will run after the resource has been created whether success or error
    onSettled: () => {
      console.log("Settled");
    },
  });
}
