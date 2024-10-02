import { useQuery } from "@tanstack/react-query";
import { getJobsId } from "./api";

// This file is a tanstack configuration to handle validating, caching, error, loading etc
export function useJobsIds() {
  return useQuery({
    queryKey: ["jobs"], // We can have anything as the query key. It just has to be unique across all keys. The key is used to revalidate the query
    queryFn: getJobsId, // The query function must always return a promise
    refetchOnWindowFocus: false, // This stops a refresh of the api call if user loses focus from your browser
    // enabled: true, // This is used for enabling or disabling this query
  });
}
